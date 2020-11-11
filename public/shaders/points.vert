#version 100
#extension GL_EXT_shader_texture_lod : enable
#define texture2DLod texture2DLodEXT
#define HAS_SHADER_TEXTURE_LOD 1
precision highp float;
#line 2
attribute vec3 aFlagCoordId;
attribute vec3 aAccentMacroLock;
varying vec4 vOuterScale;
varying vec4 vOuterAlpha;
varying vec2 vInnerScale;
varying vec2 vInnerAlpha;
varying mat2 vInnerMatrix;
varying float vAccent;
uniform mat4 uMatFlagToWorld;
uniform mat4 uMatViewProj;
uniform vec3 uViewPos;
uniform sampler2D uTexHeight;
uniform float uTime;    // for accent pulses

uniform float uMacroMicro;
uniform float uMixCount;
uniform float uBrowseDetail;
uniform float uProjectionScale;
uniform float uMaxPointSize;
uniform vec3 uRolloverParams;
#define PI 3.141592653589793

float calcPointSize() {
    float ss = .007 * uProjectionScale / gl_Position.w;
    float size = ss * mix(mix(15., 8., uMacroMicro), 1.5, uBrowseDetail);
    return min(size, uMaxPointSize);
}
float quinticOut(float t) {
    return 1. - (pow(abs(t - 1.), 5.));
}
float parabola(float x) {
    //return 1. - 4.*(x-.5)*(x-.5);
    return 4.*(x - x*x);
}
void main() {
    vec2 flagCoord;
    if (uRolloverParams.z > 0.01) {
        flagCoord = uRolloverParams.xy;
    }
    else {
        flagCoord = aFlagCoordId.xy;
    }
    float h = texture2D(uTexHeight, flagCoord).r;
    vec3 P = (uMatFlagToWorld * vec4(flagCoord, h, 1.)).xyz;
    gl_Position = uMatViewProj * vec4(P, 1.);
    
    // accent scale
    
    bool accent = (aAccentMacroLock.x > .5);
    vAccent = accent ? 1. : 0.;
    float baseScale = accent ? 3.0 : 1.0;
    
    // point size
    
    float pointSize = baseScale * calcPointSize();
    float lock = aAccentMacroLock.z;
    /* lock = fract(uTime/2.0); */
    /* lock = 2.*abs(lock - .5); */ {
        float theta = -3.0 * PI * smoothstep(0.0, 1.0, lock);
        float c = cos(theta);
        float s = sin(theta);
        float u = 2.0*abs(lock - 0.5);
        float scale = 1.0/lock;
        float alpha = lock;
        vInnerMatrix = scale * mat2(c, s, -s, c);
        vInnerAlpha[1] = alpha;
    }
    // outer ring
    vOuterScale = vec4(baseScale, 0.0, 0.0, 0.0);
    vOuterAlpha = vec4(0.3, 0.0, 0.0, 0.);
    if (accent) {
        vOuterScale.yzw = vec3(0);
        vOuterAlpha.yzw = vec3(0);
        
        //float accentTime = .4*uTime + .3333*aFlagCoordId.y + .0005*aFlagCoordId.z;
        
        float accentTime = .4*(uTime * (1.0 + 5e-5*aFlagCoordId.z)); {
            float u = quinticOut(fract(accentTime));
            vOuterScale[1] = mix(3., 1.2, u);
            vOuterAlpha[1] = .5 * parabola(u);
        }
 {
            float u = quinticOut(fract(accentTime + .170));
            vOuterScale[2] = mix(3., 1.2, u);
            vOuterAlpha[2] = .5 * parabola(u);
        }
        /* for (int i = 0; i < 3; ++i) { */
        /*     float u = fract(.3*uTime + float(i)/3.0); */
        /*     u = quinticOut(u); */
        /*     float scale = mix(2.8, 1.0, u); */
        /*     float alpha = 1.-4.*(u-.5)*(u-.5); */
        /*     vOuterScale[i + 1] = scale; */
        /*     vOuterAlpha[i + 1] = .30*(alpha); */
        /* } */
    }
    // inner diamond
    vInnerScale[0] = 3.5*baseScale / smoothstep(.8, .0, lock);
    vInnerScale[1] = 3.5*baseScale;
    vInnerAlpha[0] = smoothstep(.5, .0, lock);
    if (true) {
        // when is it hidden???
        // i need a blend out
        float w = .1;
        float blend = smoothstep(uMixCount, uMixCount-w, aAccentMacroLock.y-w);
        //float d = mix(30., 5., pow(uMacroMicro, .33));
        
        
        vInnerAlpha *= blend;
        vOuterAlpha *= blend;
    }
    if (uRolloverParams.z > .01) {
        vInnerAlpha[0] = 0.0;
        vInnerAlpha[1] = 0.0;
        vOuterAlpha[0] = 0.0;
        vOuterAlpha[2] = 0.0;
        vOuterAlpha[3] = 0.0;
        vOuterScale[1] = baseScale;
        vOuterAlpha[1] = uRolloverParams.z * 1.0;
        vAccent = 1.;
    }
    // clamp to 1 pixel and modulate brightness by coverage
    if (pointSize < 1.0) {
        float b = pointSize * pointSize;
        vOuterAlpha *= b;
        vInnerAlpha *= b;
        pointSize = 1.0;
    }
    gl_PointSize = pointSize;
}
