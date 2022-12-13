/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Pirate.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="rig">
          <primitive object={nodes.root} />
          <primitive object={nodes['MCH-torsoparent']} />
          <primitive object={nodes['MCH-hand_ikparentL']} />
          <primitive object={nodes['MCH-upper_arm_ik_targetparentL']} />
          <primitive object={nodes['MCH-hand_ikparentR']} />
          <primitive object={nodes['MCH-upper_arm_ik_targetparentR']} />
          <primitive object={nodes['MCH-foot_ikparentL']} />
          <primitive object={nodes['MCH-thigh_ik_targetparentL']} />
          <primitive object={nodes['MCH-foot_ikparentR']} />
          <primitive object={nodes['MCH-thigh_ik_targetparentR']} />
          <group name="Cube">
            <skinnedMesh name="Cube_1" geometry={nodes.Cube_1.geometry} material={materials.Material} skeleton={nodes.Cube_1.skeleton} />
            <skinnedMesh name="Cube_2" geometry={nodes.Cube_2.geometry} material={materials.Beard} skeleton={nodes.Cube_2.skeleton} />
            <skinnedMesh name="Cube_3" geometry={nodes.Cube_3.geometry} material={materials.Jacket} skeleton={nodes.Cube_3.skeleton} />
            <skinnedMesh name="Cube_4" geometry={nodes.Cube_4.geometry} material={materials.Pants} skeleton={nodes.Cube_4.skeleton} />
            <skinnedMesh name="Cube_5" geometry={nodes.Cube_5.geometry} material={materials.Eyes} skeleton={nodes.Cube_5.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Pirate.gltf')