#version 100
precision highp float;
#define N_TAPS 16
varying vec2 vCoord;
uniform sampler2D uTexSource;
uniform vec2 uSampleDelta;      // texel offset for this pass

uniform vec2 uTaps[N_TAPS];     // {x: weight, y: offset}

void main() {
    vec4 C = uTaps[0].x * texture2D(uTexSource, vCoord);
    for (int i = 1; i < N_TAPS; ++i) {
        float weight = uTaps[i].x;
        float offset = uTaps[i].y;
        C += weight * (
        texture2D(uTexSource, vCoord + offset*uSampleDelta) +
        texture2D(uTexSource, vCoord - offset*uSampleDelta));
    }
    gl_FragColor = C;
}
