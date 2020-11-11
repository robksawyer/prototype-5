#version 100
precision highp float;
attribute vec2 aCoord;
varying vec2 vCoord;
void main() {
    vCoord = aCoord;
    gl_Position = vec4(2.*(aCoord-.5), 0., 1.);
}
