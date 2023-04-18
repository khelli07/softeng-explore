const components = [
    // Head
    new Cuboid(0.1, 0.15, 0.125, trans)
        .setTranslation([0, 0.7, 0]),

    // Torso
    new Cuboid(0.25, 0.2, 0.075, trans)
        .setTranslation([0.0, 0.35, 0.0]),

    // Left arm
    new Cuboid(0.03, 0.5, 0.03, trans)
        .setTranslation([-0.2, 0.1, 0.0])
        .setRotation([0, 0, 90])
        .setRotationCenter([-0.3, 0, 0]),

    // Right arm
    new Cuboid(0.03, 0.5, 0.03, trans)
        .setTranslation([0.2, 0.1, 0.0])
        .setRotation([0, 0, 90])
        .setRotationCenter([-0.3, 0, 0]),

    // Left leg
    new Cuboid(0.035, 0.5, 0.05, trans)
        .setTranslation([-0.08, -0.37, 0.0])
        .setRotation([0, 0, 90])
        .setRotationCenter([0, 0, 0]),

    // Right leg
    new Cuboid(0.035, 0.5, 0.05, trans)
        .setTranslation([0.08, -0.37, 0.0])
        .setRotation([0, 0, 90])
        .setRotationCenter([0, 0, 0]),
]