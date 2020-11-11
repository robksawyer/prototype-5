#version 100
#extension GL_EXT_shader_texture_lod : enable
#define texture2DLod texture2DLodEXT
#define HAS_SHADER_TEXTURE_LOD 1
precision highp float;
#line 11
varying vec2 vCoord;
uniform float uLevel;
uniform vec3 uGainGammaSaturation;
#define N_LEVELS 5
uniform vec3 uLevelColors[N_LEVELS];
uniform sampler2D uTexColors[N_LEVELS];
void main() {
    if (true) {
        vec3 C = vec3(0);
        for (int i = 0; i < N_LEVELS; ++i)
        C += uLevelColors[i] * texture2D(uTexColors[i], vCoord).rgb;
        float gain = uGainGammaSaturation.x;
        float gamma = uGainGammaSaturation.y;
        float saturation = uGainGammaSaturation.z;
        C = pow(C, vec3(gamma));
        vec3 Cg = vec3(dot(C, vec3(.2126, .7152, .0722)));
        //C = gain * pow(mix(Cg, C, saturation), vec3(gamma));
        
        C = gain * mix(Cg, C, saturation);
        gl_FragColor = vec4(C, 1.);
    }
    else {
        // use this for blur
        // XXX need to lerp two levels here
        gl_FragColor = texture2D(uTexColors[0], vCoord);
    }

}
