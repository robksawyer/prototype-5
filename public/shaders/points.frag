#version 100
#extension GL_EXT_shader_texture_lod : enable
#define texture2DLod texture2DLodEXT
#define HAS_SHADER_TEXTURE_LOD 1
precision highp float;
#line 150
varying mat2 vInnerMatrix;
varying vec4 vOuterScale;
varying vec4 vOuterAlpha;
varying vec2 vInnerScale;
varying vec2 vInnerAlpha;
varying float vLock;
varying float vAccent;
uniform sampler2D uTexDiamond;
uniform float uOpacity;
uniform float uTime;
uniform int uDetail;

// clamp border to zero

vec4 sampleDiamond(vec2 uv) {
    vec4 C = texture2D(uTexDiamond, uv);
    vec2 size = vec2(128.0);
    vec2 factors = clamp(0.5 + (abs(uv - .5) - .5) * size, 0.0, 1.0);
    C = mix(C, vec4(0.0), factors.x);
    C = mix(C, vec4(0.0), factors.y);
    return C;
}
vec4 sampleDiamond(float scale) {
    vec2 co = gl_PointCoord.xy;
    co = .5 + scale*(co - .5);
    return sampleDiamond(co);
}
vec4 sampleDiamond(mat2 matrix) {
    vec2 co = gl_PointCoord.xy;
    co = .5 + matrix*(co - .5);
    return sampleDiamond(co);
}
void main() {
    vec2 co = gl_PointCoord.xy;
    vec3 C = vec3(0.);
    
    // outer ring
    
    C += vOuterAlpha[0] * sampleDiamond(vOuterScale[0]).y;
    
    // accent rings
    
    if (vAccent ! = 0.) {
        for (int i = 0; i < 2; ++i)
        C += vOuterAlpha[i+1] * sampleDiamond(vOuterScale[i+1]).z;
    }
    // inner diamond
    C += vInnerAlpha[0] * sampleDiamond(vInnerScale[0]).x;
    
    // inner cross/diamond
    
    float alpha = uOpacity;
    const vec3 blue = vec3(43./255., 157./255., 216./255.);
    if (uDetail == 0) {
        if (vInnerAlpha[1] > .01) {
            C += vInnerAlpha[1] * blue * sampleDiamond(vInnerScale[1] * vInnerMatrix).w;
        }

    }
    else {
        float d = sampleDiamond(.85*vInnerScale[1] * vInnerMatrix).r;
        C += blue * d;
        alpha = max(C.g, d);
    }
    gl_FragColor = vec4(C, alpha);
}
