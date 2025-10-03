export const Display: string = `#include <common>

varying vec3 v_tt;
uniform vec3 color;

void main() {
  gl_FragColor = vec4(
    vec3(color.x + abs(v_tt.x),
     color.y + abs(v_tt.y),
    color.z + abs(v_tt.z)) * color,
    0.5
  );
}`;
