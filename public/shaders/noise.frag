#version 100
#extension GL_EXT_shader_texture_lod : enable
#define texture2DLod texture2DLodEXT
#define HAS_SHADER_TEXTURE_LOD 1
precision highp float;
#line 40
varying vec2 vCoord;
varying vec3 vEmitterCoord;
uniform sampler2D uTexPrev;
uniform sampler2D uTexCurr;
uniform sampler2D uTexHeight;
uniform mat4 uMatFlagToWorld;
uniform float uTime;
uniform float uLift;
uniform float uAdvect;
uniform float uLifetime;
uniform vec3 uMouseCoord;
uniform vec3 uRayOrigin;
uniform vec3 uRayDirection;
uniform float uSpawnRadius;
uniform int uType;
float hash11(float p) {
    p = fract(p * .1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
}
vec2 hash21(float p) {
    vec3 p3 = fract(vec3(p) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.xx+p3.yz)*p3.zy);
}
float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}
vec4 permute(vec4 x) {
    return mod(x*x*34.+x, 289.);
}
// https://gist.github.com/Makio64/56d15142d30f5add045ca1bb220e97ca
float snoise(vec3 v) {
    const vec2 C = 1./vec2(6, 3);
    const vec4 D = vec4(0, .5, 1, 2);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1. - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.x;
    vec3 x2 = x0 - i2 + C.y;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.);
    vec4 p = permute( permute( permute(
    i.z + vec4(0., i1.z, i2.z, 1.))
    + i.y + vec4(0., i1.y, i2.y, 1.))
    + i.x + vec4(0., i1.x, i2.x, 1.));
    vec3 ns = .142857142857 * D.wyz - D.xzx;
    vec4 j = p - 49. * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = floor(j - 7. * x_ ) *ns.x + ns.yyyy;
    vec4 h = 1. - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 sh = -step(h, vec4(0));
    vec4 a0 = b0.xzyw + (floor(b0)*2.+ 1.).xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + (floor(b1)*2.+ 1.).xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = inversesqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.);
    return .5 + 12. * dot( m * m * m, vec4( dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3) ) );
}
vec3 snoiseVec3( vec3 x ) {
    return vec3(
    snoise(vec3( x )*2.-1.), snoise(vec3( x.y - 19.1, x.z + 33.4, x.x + 47.2 ))*2.-1., snoise(vec3( x.z + 74.2, x.x - 124.5, x.y + 99.4 )*2.-1.));
}
vec3 curlNoise( vec3 p ) {
    const float e = .1;
    vec3 dx = vec3( e, 0.0, 0.0 );
    vec3 dy = vec3( 0.0, e, 0.0 );
    vec3 dz = vec3( 0.0, 0.0, e   );
    vec3 p_x0 = snoiseVec3( p - dx );
    vec3 p_x1 = snoiseVec3( p + dx );
    vec3 p_y0 = snoiseVec3( p - dy );
    vec3 p_y1 = snoiseVec3( p + dy );
    vec3 p_z0 = snoiseVec3( p - dz );
    vec3 p_z1 = snoiseVec3( p + dz );
    float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
    float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
    float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;
    const float divisor = 1.0 / ( 2.0 * e );
    return normalize( vec3( x, y, z ) * divisor );
}
#define PI 3.141592653589793

float boxMuller(vec2 u, float mu, float sigma) {
    float z0 = sqrt(-2.*log(u.x)) * cos(2.*PI*u.y);
    return sigma * z0 + mu;
}
float impulse(float x, float width) {
    return width / (x*x + width);
}
void main() {
    vec4 prev = texture2D(uTexPrev, vCoord);
    vec4 curr = texture2D(uTexCurr, vCoord);
    vec4 next;
    if (true) {
        const float beta = .9;
        float advect = uAdvect;
        
        //next.xyz = curr.xyz;
        
        if (prev.w > curr.w) {
            next.xyz = curr.xyz + beta * (curr.xyz - prev.xyz);
        }
        else {
            next.xyz = curr.xyz;
        }
        //if (uType == 1) { {
            // pick ray interaction
            vec3 P = curr.xyz;
            vec3 V = P - uRayOrigin;
            vec3 D = uRayDirection * dot(V, uRayDirection);
            vec3 N = V - D;
            float l = length(N);
            float amp = .05*impulse(l, 9e0)/l;
            next.xyz += amp * N/l;
            advect += .5*amp;
        }
        next.xyz += advect * curlNoise(.2*curr.xyz);
        next.y += uLift;
        
        //next.w = curr.w - .01;
        
        float d = .01*(1. + vCoord.x) / uLifetime;
        next.w = curr.w - d;
    }
    if (next.w < 0.0) {
        // respawn
        vec2 aspect = vec2(1.9, 1.0);
        float seed = uTime + dot(vCoord, vec2(123., 922.));
        if (uType == 0) {
            float limit = .05 * hash11(-uTime);
            vec2 flagCoord;
            vec2 center, sigma;
            if (uMouseCoord.z > limit &&
            abs(uMouseCoord.x - .5) < .5 &&
            abs(uMouseCoord.y - .5) < .5) {
                sigma = vec2(.05) / aspect;
                center = uMouseCoord.xy;
                flagCoord = vec2(
                boxMuller(hash21(seed), center.x, sigma.x), boxMuller(hash21(seed + 739.), center.y, sigma.y));
            }
            else if (hash11(3.2 * uTime) < .90) {
                center = vEmitterCoord.xy;
                sigma = aspect * vEmitterCoord.z;
                flagCoord = vec2(
                boxMuller(hash21(seed), center.x, sigma.x), boxMuller(hash21(seed + 739.), center.y, sigma.y));
            }
            else {
                // uniform 
                flagCoord = hash21(seed);
            }
            //vec2 flagCoord = hash21(3282.*uTime + 123.*vCoord.x + 922.*vCoord.y);
            float h = texture2D(uTexHeight, flagCoord).r;
            vec3 P = (uMatFlagToWorld * vec4(flagCoord, h, 1.)).xyz;
            next.xyz = P;
            //next.w = 1.0 + hash12(flagCoord);
            
            
            // higher when macro
            //next.w *= uLifetime;
            next.w = 1.0;
        }
        else {
            // ambient
            vec2 sco = hash21(seed);
            float theta = mix(.25, .75, sco.x) * PI;
            float phi = sco.y * 2. * PI;
            float r = boxMuller(hash21(seed + 739.), uSpawnRadius, 1.0);
            next.xyz = vec3(
            r * cos(phi) * sin(theta), r * cos(theta), r * sin(phi) * sin(theta));
            next.w = 1.0;
            //next.w = 1.0 + hash12(next.xz);
            
            //next.w *= uLifetime;
        }

    }
    //next.xyz = (uMatFlagToWorld * vec4(hash21(3282.*uTime + vCoord.x), 0., 1.)).xyz;
    //next.w = 1.0;
    gl_FragColor = next;
}
