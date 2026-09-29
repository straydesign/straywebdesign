"""Stray process story: the matte kit every beat is built from.

    /opt/homebrew/bin/blender -b -P assets/process-3d/kit.py

Writes assets/process-3d/kit.blend, public/process-3d/kit.glb and
assets/process-3d/kit-preview.png. Geometry only: the site sets every material
itself, so light and dark recolour the same meshes from the page's tokens.

Pieces (metres, described Y-up as three.js sees them):
  Tile    0.44 x 0.05 x 0.30 card (notes, research cards, page sections). Centre.
  Plate   1.00 x 0.03 x 1.00 slab (the page, the brief, lanes, dashboard). Centre.
  Bar     1.00 long on +X, 0.14 tall, 0.20 deep. Origin at the LEFT end, so
          scale.x draws it out from its start (text lines, progress).
  Node    puck, r 0.13, h 0.12 (the call, checks, toggles). Centre.
  Block   0.20 cube (the motion layer, the scatter). Centre.
  Rod     r 0.016, 1.00 long on +X (connectors). Origin at the left end.
  Pin     a review pin: ball head on a needle, 0.36 tall. Origin at the TIP, so
          it drops point-first onto the draft.
  Tick    a check mark lying flat, 0.30 wide, 0.04 thick. Centre.
  Phone   0.36 x 0.04 x 0.74 slab with rounded corners (the call, the editor). Centre.
"""
import math
import os

import bpy
import bmesh
from mathutils import Matrix, Vector

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
PUBLIC = os.path.join(ROOT, "public", "process-3d")


def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    return bpy.context.scene


def link(name, bm):
    mesh = bpy.data.meshes.new(name)
    bm.to_mesh(mesh)
    bm.free()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.scene.collection.objects.link(obj)
    return obj


def finish(obj, bevel=0.0, segments=3):
    """Bevel with hardened normals so flat faces stay flat and edges catch light."""
    if bevel > 0:
        mod = obj.modifiers.new("Bevel", "BEVEL")
        mod.width = bevel
        mod.segments = segments
        mod.limit_method = "ANGLE"
        mod.harden_normals = True
    for p in obj.data.polygons:
        p.use_smooth = True
    return obj


def box(name, sx, sy, sz, origin=(0, 0, 0)):
    """Blender Z-up: sx = width (three X), sy = depth (three -Z), sz = height (three Y)."""
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts:
        v.co.x = v.co.x * sx - origin[0]
        v.co.y = v.co.y * sy - origin[1]
        v.co.z = v.co.z * sz - origin[2]
    return link(name, bm)


def cylinder(name, r, depth, verts=40, axis="Z", origin_end=False):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=verts, radius1=r, radius2=r, depth=depth)
    if axis == "X":
        bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=Matrix.Rotation(math.radians(90), 3, "Y"))
    if origin_end:
        for v in bm.verts:
            v.co.x += depth / 2
    return link(name, bm)


def pin():
    bm = bmesh.new()
    # Needle: a slim cone from a near-point at the origin up to the head.
    bmesh.ops.create_cone(bm, cap_ends=True, segments=20, radius1=0.004, radius2=0.016, depth=0.24)
    for v in bm.verts:
        v.co.z += 0.12
    head = bmesh.new()
    bmesh.ops.create_uvsphere(head, u_segments=32, v_segments=20, radius=0.075)
    for v in head.verts:
        v.co.z += 0.285
    tmp = bpy.data.meshes.new("tmp")
    head.to_mesh(tmp)
    head.free()
    bm.from_mesh(tmp)
    bpy.data.meshes.remove(tmp)
    return finish(link("Pin", bm))


def tick():
    """Two overlapping arms of a check, flat on the ground, reading upright from above."""
    w, t = 0.052, 0.04
    arms = [((-0.13, 0.015), (-0.035, -0.08)), ((-0.035, -0.08), (0.15, 0.11))]
    bm = bmesh.new()
    for (x0, y0), (x1, y1) in arms:
        length = math.hypot(x1 - x0, y1 - y0) + w
        arm = bmesh.new()
        bmesh.ops.create_cube(arm, size=1.0)
        for v in arm.verts:
            v.co.x *= length
            v.co.y *= w
            v.co.z *= t
        ang = math.atan2(y1 - y0, x1 - x0)
        bmesh.ops.rotate(arm, verts=arm.verts, cent=(0, 0, 0), matrix=Matrix.Rotation(ang, 3, "Z"))
        bmesh.ops.translate(arm, verts=arm.verts, vec=Vector(((x0 + x1) / 2, (y0 + y1) / 2, 0)))
        tmp = bpy.data.meshes.new("tmp")
        arm.to_mesh(tmp)
        arm.free()
        bm.from_mesh(tmp)
        bpy.data.meshes.remove(tmp)
    obj = link("Tick", bm)
    return finish(obj, bevel=0.01, segments=3)


def phone():
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts:
        v.co.x *= 0.36
        v.co.y *= 0.74
        v.co.z *= 0.04
    vertical = [e for e in bm.edges if abs(e.verts[0].co.z - e.verts[1].co.z) > 0.03]
    bmesh.ops.bevel(bm, geom=vertical, offset=0.07, segments=10, affect="EDGES", profile=0.5)
    obj = link("Phone", bm)
    return finish(obj, bevel=0.01, segments=3)


def build():
    finish(box("Tile", 0.44, 0.30, 0.05), bevel=0.012, segments=3)
    finish(box("Plate", 1.00, 1.00, 0.03), bevel=0.008, segments=2)
    finish(box("Bar", 1.00, 0.20, 0.14, origin=(-0.5, 0, 0)), bevel=0.02, segments=3)
    finish(cylinder("Node", 0.13, 0.12), bevel=0.02, segments=3)
    finish(box("Block", 0.20, 0.20, 0.20), bevel=0.024, segments=3)
    finish(cylinder("Rod", 0.016, 1.0, verts=12, axis="X", origin_end=True))
    pin()
    tick()
    phone()
    matte = bpy.data.materials.new("Matte")
    matte.use_nodes = True
    matte.node_tree.nodes["Principled BSDF"].inputs["Roughness"].default_value = 0.85
    for o in bpy.context.scene.objects:
        if o.type == "MESH":
            o.data.materials.append(matte)


def export():
    os.makedirs(PUBLIC, exist_ok=True)
    for o in bpy.context.scene.objects:
        o.select_set(o.type == "MESH")
    bpy.ops.export_scene.gltf(
        filepath=os.path.join(PUBLIC, "kit.glb"),
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_normals=True,
        export_texcoords=False,
        export_materials="NONE",
    )


def preview(scene):
    """A quick Eevee look at the kit in a row, to check the bevels read."""
    x = -2.4
    for o in scene.objects:
        if o.type != "MESH":
            continue
        o.location.x = x
        x += 0.62
    scene.render.engine = "BLENDER_EEVEE_NEXT" if "BLENDER_EEVEE_NEXT" in [e.identifier for e in bpy.types.RenderSettings.bl_rna.properties["engine"].enum_items] else "BLENDER_EEVEE"
    scene.render.resolution_x, scene.render.resolution_y = 1600, 500
    w = bpy.data.worlds.new("W")
    scene.world = w
    w.use_nodes = True
    w.node_tree.nodes["Background"].inputs["Color"].default_value = (0.96, 0.96, 0.96, 1)
    w.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.8
    sun = bpy.data.objects.new("Sun", bpy.data.lights.new("Sun", "SUN"))
    sun.data.energy = 3
    sun.rotation_euler = (math.radians(50), 0, math.radians(30))
    scene.collection.objects.link(sun)
    cam = bpy.data.objects.new("Cam", bpy.data.cameras.new("Cam"))
    cam.data.type = "ORTHO"
    cam.data.ortho_scale = 6.0
    cam.location = (0.1, -6, 3.6)
    cam.rotation_euler = (math.radians(60), 0, 0)
    scene.collection.objects.link(cam)
    scene.camera = cam
    scene.render.filepath = os.path.join(HERE, "kit-preview.png")
    bpy.ops.render.render(write_still=True)
    for o in scene.objects:
        if o.type == "MESH":
            o.location.x = 0


def main():
    scene = reset()
    build()
    export()
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, "kit.blend"))
    preview(scene)


main()
