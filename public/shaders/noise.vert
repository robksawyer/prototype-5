#version 100
#extension GL_EXT_shader_texture_lod : enable
#define texture2DLod texture2DLodEXT
#define HAS_SHADER_TEXTURE_LOD 1
precision highp float;
#line 2
attribute vec2 aCoord;
varying vec2 vCoord;
varying vec3 vEmitterCoord;
uniform float uTime;
float hash(float n) {
    return fract(sin(n) * 1e4);
}
float hash(vec2 p) {
    return fract(
    1e4 * sin(17. * p.x + p.y * .1) *
    (.1 + abs(sin(p.y * 13. + p.x))));
}
float noise(float x) {
    float i = floor(x);
    float f = fract(x);
    float u = f * f * (3. - 2. * f);
    return mix(hash(i), hash(i + 1.), u);
}
void main() {
    gl_Position = vec4((aCoord - .5)*2., 0., 1.);
    vCoord = aCoord; {
        // emitter animation
        float t = uTime * 3e-1;
        vEmitterCoord = vec3(
        noise(t), noise(t + 739.), mix(.01, .1, noise(1.3*t + 1389.)));
        //mix(-1., -9., noise(t + 1389.)));
    }

}
