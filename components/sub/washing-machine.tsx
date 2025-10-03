"use client";
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
// import { Display } from "./shader/display.frag";
import { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export function WashingMachine({ mode = 5 }) {
  let [api, setAPI] = useState({
    show: null,
    update: (v: any, v2: any) => {},
    clean: () => {},
  });
  let gl = useThree((r) => r.gl);
  let scene = useThree((r) => r.scene);

  useEffect(() => {
    let stuff = makeAPI({
      mode: mode,
      renderer: gl,
      scene,
    });

    setAPI(stuff);
    return () => {
      stuff.clean();
    };
  }, [gl, mode, scene]);

  useFrame((st, dt) => {
    api?.update(st, dt);
  });
  return (
    <>
      {api.show}
      {/*  */}
    </>
  );
}

const makeAPI = ({
  mode = 5,
  renderer,
  scene,
}: {
  mode: number;
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

      idxData[p + 0] = isNaN(slot[p + 0]) ? 0 : slot[p + 0];
      idxData[p + 1] = isNaN(slot[p + 1]) ? 0 : slot[p + 1];
      idxData[p + 2] = isNaN(slot[p + 2]) ? 0 : slot[p + 2];
      idxData[p + 3] = isNaN(slot[p + 3]) ? 0 : slot[p + 3];
      p += 4;
    }
  }

  var posDynamic = gpuCompute.createTexture();

  let tPos = Compute;

  var posVar = gpuCompute.addVariable("tPos", tPos, posDynamic);
  posVar.material.uniforms.tIdx = { value: posIdx };
  posVar.material.uniforms.ballMode = { value: mode };
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
    mode: { value: 0 },
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

      v_tt = normalize(tt.yzz);

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
        abs(v_tt.x) * 1.0 + 0.5,
        (abs(v_tt.y)) * 0.5 + 0.3,
        abs(v_tt.z) * 1.0 + 0.5,
        1.0
      );
    }

    `,
    side: DoubleSide,
  });

  uniforms.color.value = new Color("#82A0FF80");

  var mesh = new Points(geo, material);
  mesh.frustumCulled = false;

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
    let v = 0;
    mesh.rotation.x = (v / 100.0) * 2.0 * Math.PI;
  }
  {
    let v = 0;
    mesh.rotation.y = (v / 100.0) * 2.0 * Math.PI;
  }
  {
    let v = 9;
    mesh.rotation.z = (v / 100.0) * 2.0 * Math.PI;
  }

  let api: any = {};

  let update = (st: any, dt: number) => {
    let time = st.clock.getElapsedTime();
    // stateVar.material.uniforms.time.value = time
    posVar.material.uniforms.time.value = time;
    // velVar.material.uniforms.time.value = time

    uniforms.tPos.value = gpuCompute.getCurrentRenderTarget(posVar).texture;
    uniforms.time.value = time;
    gpuCompute.compute();

    
  };
  api.update = update;

  api.mesh = mesh;
  api.show = <primitive object={mesh}></primitive>;

  api.clean = () => {
    mesh.removeFromParent();
  };
  return api;
};
