#version 100
#extension GL_EXT_shader_texture_lod : enable
#define texture2DLod texture2DLodEXT
#define HAS_SHADER_TEXTURE_LOD 1
precision highp float;
#line 2
attribute vec2 aCoord;
varying vec2 vCoord;
void main() {
    vCoord = aCoord;
    gl_Position = vec4(2.*(aCoord-.5), 0., 1.);
}
