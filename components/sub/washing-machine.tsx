import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  Points,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from "three";
import { GPUComputationRenderer } from "three/examples/jsm/Addons.js";
import { Compute } from "./shader/compute.frag";
import { Display } from "./shader/display.frag";
import { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export function WashingMachine() {
  let [api, setAPI] = useState({ update: (v: any, v2: any) => {} });
  let gl = useThree((r) => r.gl);
  let scene = useThree((r) => r.scene);

  useEffect(() => {
    let pai = makeAPI({
      renderer: gl,
      scene,
    });

    setAPI(pai);
    return () => {};
  }, [gl, scene]);

  useFrame((st, dt) => {
    api?.update(st, dt);
  });
  return (
    <>
      {/*  */}

      {/*  */}
    </>
  );
}

const makeAPI = ({
  renderer,
  scene,
}: {
  renderer: WebGLRenderer;
  scene: Scene;
}) => {
  let WIDTH = 512;

  let gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, renderer);

  // pos IDX
  var posIdx = gpuCompute.createTexture();
  var slot: any = posIdx.image.data;
  var p = 0;

  let idxData: any = [];

  for (var j = 0; j < WIDTH; j++) {
    for (var i = 0; i < WIDTH; i++) {
      let id = p / 4;
      slot[p + 0] = id % 6; // square 1 / 6 index
      slot[p + 1] = Math.floor(id / 6); // square
      slot[p + 2] = (WIDTH * WIDTH) / 6.0; // total
      slot[p + 3] = id;

      idxData[p + 0] = slot[p + 0];
      idxData[p + 1] = slot[p + 1];
      idxData[p + 2] = slot[p + 2];
      idxData[p + 3] = slot[p + 3];
      p += 4;
    }
  }

  var posDynamic = gpuCompute.createTexture();

  let tPos = Compute;

  var posVar = gpuCompute.addVariable("tPos", tPos, posDynamic);
  posVar.material.uniforms.tIdx = { value: posIdx };
  posVar.material.uniforms.time = { value: 0 };
  posVar.material.uniforms.mousePos = { value: new Vector3() };
  posVar.material.uniforms.screen = {
    value: new Vector3(window.innerWidth, window.innerHeight, 0.0),
  };

  // gpuCompute.setVariableDependencies( stateVar, [ stateVar, posVar, velVar ] );
  // gpuCompute.setVariableDependencies( velVar, [ posVar ] );
  gpuCompute.setVariableDependencies(posVar, [posVar]);

  var error = gpuCompute.init();
  if (error !== null) {
    console.error(error);
  }

  let makePosSimShader = () => {
    let v = Compute;
    v = `
      uniform sampler2D tPos;
      ${v}
    `;
    posVar.material.fragmentShader = v;
    posVar.material.needsupdate = true;
  };

  makePosSimShader();

  var geo = new BufferGeometry();

  let getUVInfo = () => {
    let newArr = [];
    var na = 0;
    for (var j = 0; j < WIDTH; j++) {
      for (var i = 0; i < WIDTH; i++) {
        newArr[na + 0] = i / WIDTH;
        newArr[na + 1] = j / WIDTH;
        newArr[na + 2] = 0;
        na += 3;
      }
    }
    return newArr;
  };

  geo.setAttribute(
    "position",
    new BufferAttribute(new Float32Array(getUVInfo()), 3)
  );
  geo.setAttribute("posIdx", new BufferAttribute(new Float32Array(idxData), 4));
  var uniforms: any = {
    color: { value: new Color("#ffffff") },
    time: { value: 0 },
    tPos: { value: null },
  };
  var material = new ShaderMaterial({
    transparent: true,
    uniforms,
    defines: {
      resolution: `vec2(${renderer.domElement.width.toFixed(
        1
      )}, ${renderer.domElement.height.toFixed(1)})`,
    },
    vertexShader: `
    #include <common>
    uniform highp sampler2D tPos;
    // uniform sampler2D tIdx;

    varying vec3 v_tt;

    void main() {
      // vec3 newPos = vec3(1.0);

      // position is changed to host uv vals
      vec4 tt = texture2D(tPos, position.xy);
      // vec4 idx = texture2D(tIdx, position.xy);

      v_tt = normalize(tt.xyz);

      vec4 mvPosition = modelViewMatrix * tt;
      vec4 outputPos = projectionMatrix * mvPosition;

      gl_Position = outputPos;
      gl_PointSize = 1.0;
    }
    `,
    fragmentShader: `
    #include <common>

    varying vec3 v_tt;

    void main () {
      gl_FragColor = vec4(
        0.25 + abs(v_tt.x),
        0.75 + abs(v_tt.y),
        0.25 + abs(v_tt.z),
        0.7
      );
    }

    `,
    side: DoubleSide,
  });
  geo.computeBoundingBox();
  geo.computeBoundingSphere();

  let makeDisplayFragShader = () => {
    let v = Display;
    v = `
      ${v}
    `;
    material.fragmentShader = v;
    material.needsupdate = true;
  };
  // makeDisplayFragShader();

  //   env.getCode("display-frag").stream(() => {
  //     makeDisplayFragShader();
  //   });
  uniforms.color.value = new Color("#82A0FF80");

  var mesh = new Points(geo, material);
  mesh.frustumCulled = false;
  scene.add(mesh);
  {
    let v = 13.9;
    mesh.scale.x = v / 50;
    mesh.scale.y = v / 50;
    mesh.scale.z = v / 50;
  }

  {
    let v = 50;
    mesh.position.x = (v - 50.0) * 2.0;
  }
  {
    let v = 50;
    mesh.position.y = (v - 50.0) * 2.0;
  }
  {
    let v = 50;
    mesh.position.z = (v - 50.0) * 2.0;
  }

  {
    let v = 10.33;
    mesh.rotation.x = (v / 100.0) * 2.0 * Math.PI;
  }
  {
    let v = 37.74;
    mesh.rotation.y = (v / 100.0) * 2.0 * Math.PI;
  }
  {
    let v = 13.9;
    mesh.rotation.z = (v / 100.0) * 2.0 * Math.PI;
  }

  let api: any = {};

  let update = () => {
    let time = window.performance.now() * 0.001;
    // stateVar.material.uniforms.time.value = time
    posVar.material.uniforms.time.value = time;
    // velVar.material.uniforms.time.value = time

    uniforms.tPos.value = gpuCompute.getCurrentRenderTarget(posVar).texture;
    uniforms.time.value = time;
    gpuCompute.compute();
    console.log(123);
  };
  api.update = update;

  return api;
};
