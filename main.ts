namespace SpriteKind {
    export const Life = SpriteKind.create()
    export const Collectible = SpriteKind.create()
    export const Chest = SpriteKind.create()
    export const GoldCollectible = SpriteKind.create()
    export const Dust = SpriteKind.create()
    export const Distraction = SpriteKind.create()
    export const Clam = SpriteKind.create()
    export const Goal = SpriteKind.create()
    export const Castle = SpriteKind.create()
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    canJump = true
    if (tiles.tileAtLocationEquals(location, assets.tile`myTile0`)) {
        info.changeScoreBy(100)
        tiles.setTileAt(location, assets.tile`depletedTile`)
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    toySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 3 3 . . . . . . . 
        . . . . . . 3 2 2 3 . . . . . . 
        . . . . . 3 2 2 2 2 3 . . . . . 
        . . . . . 3 2 2 2 2 3 . . . . . 
        . . . . . . 3 2 2 3 . . . . . . 
        . . . . . . . 3 3 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Distraction)
    toySprite.setPosition(dogSprite.x, dogSprite.y)
    toySprite.lifespan = 3000
    if (characterAnimations.matchesRule(dogSprite, characterAnimations.rule(Predicate.FacingRight))) {
        toySprite.setVelocity(50, -25)
    } else {
        toySprite.setVelocity(-50, -25)
    }
    toySprite.ay = 100
    toySprite.setBounceOnWall(true)
    spriteutils.onSpriteUpdateInterval(toySprite, 100, function (sprite) {
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            if (spriteutils.distanceBetween(sprite, value) < 100) {
                value.follow(sprite)
            }
        }
    })
})
function level1 () {
    scene.setBackgroundColor(8)
    tiles.setCurrentTilemap(tilemap`level1`)
    effects.bubbles.startScreenEffect()
    for (let value3 of tiles.getTilesByType(assets.tile`chest`)) {
        clamSprite = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . c c c c c c c c . . . . 
            . . c c b b 3 b 3 3 b b c c . . 
            . c 3 3 b 3 3 b 3 3 3 b 3 3 c . 
            c d d b 3 3 b 3 3 b 3 3 b d d c 
            f c c c d d c d d c d d c c c f 
            f b 3 c c c b c c b c c c 3 b f 
            . c b b 3 3 b 3 3 b 3 3 b b c . 
            . . f f f f f f f f f f f f . . 
            `, SpriteKind.Clam)
        tiles.placeOnTile(clamSprite, value3)
        clownFishSprite = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . 8 8 8 8 . . . . 
            . . . . . . 8 8 4 4 4 4 8 . . . 
            . . . . . 8 8 8 8 8 8 4 8 . . . 
            . . . . 8 8 7 7 7 7 4 8 8 . . . 
            . . . 8 7 4 7 7 7 7 7 6 8 . 8 8 
            . . 8 7 7 7 6 7 7 7 7 4 6 8 7 8 
            . 8 7 7 7 7 6 7 7 7 7 7 6 8 7 8 
            8 7 7 7 7 7 6 7 7 7 7 7 6 7 7 f 
            8 7 7 7 2 7 6 8 8 7 7 7 6 f 7 f 
            8 7 7 7 7 7 6 7 7 f 7 7 4 f 7 f 
            . 8 7 7 7 7 6 8 7 f 7 4 f f f f 
            . . 8 8 7 4 7 7 f f 7 8 f 8 . . 
            . . . . 8 8 7 7 7 7 8 4 b 8 . . 
            . . . . . . 8 8 8 8 4 4 4 8 . . 
            . . . . . . . . . . 8 8 8 . . . 
            `, SpriteKind.Enemy)
        tiles.placeOnTile(clownFishSprite, value3)
        tiles.setTileAt(value3, assets.tile`transparency16`)
        sprites.setDataSprite(clamSprite, "Ghost", clownFishSprite)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile9`)) {
        crabSprite = sprites.create(img`
            ........................................
            ........................................
            ........................................
            ........................................
            ........................................
            ........................................
            ........................................
            ........ff.....................ff.......
            .......f2f.ff...............ff.f2f......
            ......fa2f.f2f.............f2f.f2af.....
            ......fa2f.f2f.............f2f.f2af.....
            ......fa2f.f2f.............f2f.f2af.....
            ......fa2fff2f.............f2fff2af.....
            ......fa22222f.............f22222af.....
            ......fa22222f....fffff....f22222af.....
            ......ffa222ff..ff22222ff..ff222aff.....
            .......ffaaff..f222222222f..ffaaff......
            ........ffff..f22f72227f22f..ffff.......
            .........ff..f222ff222ff222f..ff........
            .........faff222222222222222ffaf........
            ..........faf111222fff222111faf.........
            ...........fafd11111111111dfaf..........
            ...........f2afd111111111dfa2f..........
            ..........f2ffffdd11111ddffff2f.........
            ..........2fff22ffdddddff22fff2.........
            ..........2f22ff22fffff22ff22f2.........
            ...........2f.22f.......f22.f2..........
            ...........f.22f.........f22.f..........
            .............2ff.........ff2............
            ........................................
            ........................................
            ........................................
            ........................................
            ........................................
            ........................................
            ........................................
            ........................................
            ........................................
            ........................................
            ........................................
            `, SpriteKind.Goal)
        tiles.placeOnTile(crabSprite, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    totalGoldCollectibles = sprites.allOfKind(SpriteKind.Clam).length
}
function createLevel () {
    if (currentLevel == 0) {
        level0()
    } else if (currentLevel == 1) {
        level1()
    } else if (currentLevel == 2) {
        level2()
    }
    createBonesAndLives()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`hazardTile`, function (sprite, location) {
    info.changeScoreBy(-20)
    tiles.placeOnRandomTile(sprite, assets.tile`myTile`)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (canJump == true) {
        canJump = false
        dogSprite.setVelocity(0, -200)
        music.setVolume(255)
        music.play(music.createSoundEffect(WaveShape.Triangle, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
})
function createBonesAndLives () {
    for (let index = 0; index < 3; index++) {
        heartSprite = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f . f f f . . . . 
            . . . . f 3 3 3 f 3 3 3 f . . . 
            . . . . f 3 3 3 3 3 1 3 f . . . 
            . . . . f 3 3 3 3 3 3 3 f . . . 
            . . . . . f 3 b b b 3 f . . . . 
            . . . . . f f b b b f f . . . . 
            . . . . . . f f b f f . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Life)
        tiles.placeOnRandomTile(heartSprite, assets.tile`transparency16`)
        animation.runMovementAnimation(
        heartSprite,
        animation.animationPresets(animation.bobbing),
        randint(1000, 1500),
        true
        )
    }
    for (let value of tiles.getTilesByType(assets.tile`bones`)) {
        doggyBone = sprites.create(img`
            . . c 1 1 b c . . . . . . . . . 
            . c b d 1 d c . . . . . . . . . 
            c 1 d d 1 1 c . . . . . . . . . 
            c 1 1 1 1 1 b . . . . . . . . . 
            b b d 1 1 1 d c . . . . . . . . 
            . b b b b 1 1 1 c . . . . . . . 
            . . . . . b 1 1 1 c . . . . . . 
            . . . . . . b 1 1 1 d . . . . . 
            . . . . . . . c 1 1 1 b . . . . 
            . . . . . . . . c 1 1 b b b b . 
            . . . . . . . . b d 1 1 1 d b b 
            . . . . . . . . . b 1 1 1 1 1 c 
            . . . . . . . . . c 1 1 d d 1 c 
            . . . . . . . . . c d 1 d b c . 
            . . . . . . . . . c b 1 1 c . . 
            . . . . . . . . . . c c c . . . 
            `, SpriteKind.Collectible)
        tiles.placeOnTile(doggyBone, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        animation.runMovementAnimation(
        doggyBone,
        animation.animationPresets(animation.bobbing),
        randint(1000, 3000),
        true
        )
    }
    for (let value2 of tiles.getTilesByType(assets.tile`venomousCat`)) {
        fvCatSprite = sprites.create(img`
            6 6 6 . . . . 6 6 6 . . . . . . . . . . 
            6 7 7 9 . . 9 7 7 6 . . . . . . . . . . 
            6 9 7 7 f f 7 7 9 6 . . . . f f f . . . 
            6 2 9 7 7 9 7 9 2 6 . . f 6 5 5 6 . . . 
            f 9 2 7 7 7 7 2 9 f . f 6 5 5 6 . . . . 
            6 7 7 7 7 7 7 7 7 6 . f 5 6 6 6 . . . . 
            6 7 5 7 7 7 7 5 7 6 f 6 5 5 6 6 . . . . 
            f 7 7 5 7 7 5 7 7 f f 5 6 5 5 6 . . f . 
            f 9 7 7 9 9 7 7 2 f f 5 6 6 5 6 . f 9 f 
            . f 2 2 2 2 2 2 9 9 5 5 6 6 6 f f 7 7 f 
            . f 9 7 7 7 7 7 7 9 9 6 6 6 7 7 9 7 f . 
            . f 7 7 7 7 7 7 7 7 7 7 7 7 7 f f f . . 
            . f 7 f f f 7 f f f f f f 7 f . . . . . 
            . f f . . f f f . . . . . f f . . . . . 
            `, SpriteKind.Enemy)
        if (Math.percentChance(25)) {
            sprites.setDataBoolean(fvCatSprite, "isFake", true)
        }
        tiles.placeOnTile(fvCatSprite, value2)
        tiles.setTileAt(value2, assets.tile`transparency16`)
        spriteutils.onSpriteUpdateInterval(fvCatSprite, 500, function (sprite) {
            if (spriteutils.distanceBetween(dogSprite, sprite) < 75) {
                sprite.follow(dogSprite, randint(15, 25))
            } else {
                sprite.follow(dogSprite, randint(0, 0))
            }
            if (spriteutils.distanceBetween(dogSprite, sprite) < 25) {
                if (sprites.readDataBoolean(sprite, "isFake")) {
                    sprites.destroy(sprite)
                }
            }
        })
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Chest, function (sprite, otherSprite) {
    otherSprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    otherSprite.setImage(img`
        . f f f f f f f f f f f f f f . 
        f 3 3 3 3 3 3 3 3 3 3 3 3 3 3 f 
        f a 3 3 3 3 3 3 3 3 3 3 3 3 a f 
        f a a 3 3 3 3 3 3 3 3 3 3 a a f 
        f f f f f f f 5 5 f f f f f f f 
        . f f f f f f 1 1 f f f f f f . 
        f c c c c c f 1 1 f c c c c c f 
        f c c c c c c f f c c c c c c f 
        f c c c c c c c c c c c c c c f 
        f c c c c c c c c c c c c c c f 
        f f f f f f f f f f f f f f f f 
        f 3 3 3 3 3 3 3 3 3 3 3 3 3 3 f 
        f 3 3 3 3 3 3 3 3 3 3 3 3 3 3 f 
        f a 3 3 3 3 3 3 3 3 3 3 3 3 a f 
        f f f f f f f f f f f f f f f f 
        . f f . . . . . . . . . . f f . 
        `)
    dustSprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Dust)
    dustSprite.scale = 4
    dustSprite.lifespan = 501
    animation.runImageAnimation(
    dustSprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 4 4 . . . . . . . 
        . . . . . . 4 1 1 4 . . . . . . 
        . . . . . . 4 1 1 4 . . . . . . 
        . . 4 5 5 4 1 1 1 1 4 5 5 . . . 
        . . 4 4 1 1 1 1 1 1 1 1 4 4 . . 
        . . 4 4 1 1 1 1 1 1 1 1 4 4 . . 
        . . . 4 1 1 1 1 1 1 1 1 4 . . . 
        . . . . 4 1 1 1 1 1 1 4 . . . . 
        . . . . 5 1 1 1 1 1 1 5 . . . . 
        . . . . 5 1 1 4 4 1 1 5 . . . . 
        . . . . 4 4 4 5 5 5 4 4 . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . 4 1 1 4 . . . . . . 
        . . . . . 5 1 1 1 1 5 . . . . . 
        . . . . . 5 1 1 1 1 5 . . . . . 
        . . . . . . 4 1 1 4 . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . 4 4 . . . . . . . . 
        . . . . . . 4 1 4 . . . . . . . 
        . . 4 4 . . 4 1 4 . . 4 4 . . . 
        . . 4 1 4 . 4 1 4 5 4 1 4 . . . 
        . . . 4 1 4 4 1 4 5 1 4 . . . . 
        4 4 4 4 5 1 4 1 1 1 4 . . . . . 
        4 1 1 1 1 1 1 1 1 5 4 4 4 4 4 4 
        . 4 4 4 5 4 1 1 1 1 1 1 1 1 1 4 
        . . . . . 5 1 1 1 4 4 5 4 4 4 . 
        . . . . 4 1 4 1 4 1 5 . . . . . 
        . . . 4 1 4 5 1 4 4 1 4 . . . . 
        . . 4 1 4 . 5 1 4 . 4 1 4 . . . 
        . . 4 4 . . 4 1 4 . . 4 4 . . . 
        . . . . . . 4 1 4 . . . . . . . 
        . . . . . . 4 1 4 . . . . . . . 
        . . . . . . 4 4 . . . . . . . . 
        `,img`
        . . 4 4 . . . 4 4 . . . . . . . 
        . 4 1 1 5 . . 4 1 4 . . 4 4 4 . 
        . 4 1 1 5 . . 4 1 4 . 4 1 1 4 . 
        . . 4 5 5 . . 5 1 5 . 5 1 1 4 . 
        . 4 4 . . . . . 5 5 . 5 5 5 . . 
        4 1 1 5 5 . . . . . . . 4 4 . . 
        4 1 1 1 5 . . . . . . 5 1 1 4 4 
        4 1 1 5 . . . . . . 4 1 1 1 1 4 
        . 4 5 5 . . . . . . . 5 1 1 4 . 
        . . . . . . . 5 . . . . 4 4 . . 
        . . 5 5 5 . 5 1 5 . . 5 5 5 . . 
        . 4 1 1 5 5 4 1 1 5 . 5 1 1 4 4 
        4 1 1 1 5 5 1 1 1 5 . 5 1 1 1 4 
        4 1 1 4 . . 4 1 4 . . . 4 1 1 4 
        4 4 4 . . . . 4 4 . . . . 4 4 . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . 4 . . . . . 
        . . . . . 4 . . . . 4 4 . . . . 
        . . . . 4 4 . . . . . 4 . . . . 
        . . . . 4 . . . 4 . . . . . . . 
        . . . . . . . . 4 . . . . . . . 
        . 4 . . . . . . . . . . 4 . . . 
        4 4 . . . . . . . . . . 4 4 . . 
        4 . . . . . . . . . . . . 4 . . 
        . . . . . . . . . . . . . . . . 
        . . . 4 . . . 4 . . . . . 4 . . 
        . . 4 4 . . . 4 . . . . . 4 4 . 
        . . 4 . . . . 4 . . . . . . 4 . 
        `],
    100,
    false
    )
    dustSprite.setPosition(otherSprite.x, otherSprite.y)
    dustSprite.y += -25
    pause(500)
    goldDoggyBone = sprites.create(img`
        . . c 5 5 b c . . . . . . . . . 
        . c b 2 5 2 c . . . . . . . . . 
        c 2 2 2 5 5 c . . . . . . . . . 
        c 5 5 5 5 5 b . . . . . . . . . 
        b b 2 5 5 5 2 c . . . . . . . . 
        . b b b b 5 5 5 c . . . . . . . 
        . . . . . b 5 5 5 c . . . . . . 
        . . . . . . b 5 5 5 2 . . . . . 
        . . . . . . . c 5 5 5 b . . . . 
        . . . . . . . . c 5 5 b b b b . 
        . . . . . . . . b 2 5 5 5 2 b b 
        . . . . . . . . . b 5 5 5 5 5 c 
        . . . . . . . . . c 5 5 2 2 5 c 
        . . . . . . . . . c 2 5 2 b c . 
        . . . . . . . . . c b 5 5 c . . 
        . . . . . . . . . . c c c . . . 
        `, SpriteKind.GoldCollectible)
    animation.runMovementAnimation(
    goldDoggyBone,
    animation.animationPresets(animation.bobbing),
    randint(2000, 3000),
    true
    )
    goldDoggyBone.scale = 1.5
    goldDoggyBone.setPosition(otherSprite.x, otherSprite.y)
    goldDoggyBone.y += -25
})
function level2 () {
    scene.setBackgroundImage(img`
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333353333333333333333333333333333333333333333333333333333333333333333333333333333333533333333333
        3333333333333333333333353333333333333333333333333333333333333333333555333333333333333333333333333333333533333333333333333333333333333333333333333335553333333333
        3333333333333333333333555333333333333333333333333333333333333333335555533333333333333333333333333333335553333333333333333333333333333333333333333355555333333333
        3333333333333333333333353333333333333333333333333333333333333333333555333333333333333333333333333333333533333333333333333333333333333333333333333335553333333333
        3333333333333333333333333333333333333333333333333111333333333333333535333333333333333333333333333333333333333333333333333333333331113333333333333335353333333333
        33333d11d3333333333333333333333333333333333333331111133333333333333333333333333333333d11d33333333333333333333333333333333333333311111333333333333333333333333333
        33331111113333333333333333333333333333333331133111111d3333333333333333333333333333331111113333333333333333333333333333333331133111111d33333333333333333333333333
        3331111111d33333333333333333333333333333331111d1111111133333333333333333333333333331111111d33333333333333333333333333333331111d111111113333333333333333333333333
        33311111111d11333333333333333333333333333d1111111111111d33333333333333333333333333311111111d11333333333333333333333333333d1111111111111d333333333333333333333333
        331111111111111333333333333333333333333d11111111111111111d3333333333333333333333331111111111111333333333333333333333333d11111111111111111d3333333333333333333333
        1d1111111111111d31113333333333333333333333333333333333333333333366633333333333311d1111111111111d3111333333333333333333333333333333333333333333336663333333333331
        1111111111111111111113333333333333333333333333333333333333333336776633333333331111111111111111111111133333333333333333333333333333333333333333367766333333333311
        1111111111166666111113333333333333533333333333333333333333333366777633333333331111111111111666661111133333333333335333333333333333333333333333667776333333333311
        111111111166777661111111d333333335553333333333333333333333333367777663333333d111111111111166777661111111d333333335553333333333333333333333333367777663333333d111
        3333333336677777663333333333333355555333333333333333333333333367777763333333333333333333366777776633333333333333555553333333333333333333333333677777633333333333
        3333333336777777763333333333333335553333333333333333333333333367777763333333333333333333367777777633333333333333355533333333333333333333333333677777633333333333
        3333333366777777766333333333333335353333333333333333333333333367777763333333333333333333667777777663333333333333353533333333333333333333333333677777633333333333
        3333333367777777776333333333333333333333333333333335333333333367777763333333333333333333677777777763333333333333333333333333333333353333333333677777633333333333
        3333333367777777776333366333333333333333333333333355533333333367777763333333333333333333677777777763333663333333333333333333333333555333333333677777633333333333
        3333333367777777776333677633333333333333333333333335333336633367777763333333333333333333677777777763336776333333333333333333333333353333366333677777633333333333
        3333333367777777776336677663333333333333333333333333333367763367777763333333333333333333677777777763366776633333333333333333333333333333677633677777633333333333
        3333333367777777776336777763333333333333333333333333333367763367777763333333333333333333677777777763367777633333333333333333333333333333677633677777633333333333
        3333333367777777776336777763333333333333333333333333333367763367777763333333333333333333677777777763367777633333333333333333333333333333677633677777633333333333
        6666333367777777776666777763333333333666666333333333333367763367777763333333333666663333677777777766667777633333333336666663333333333333677633677777633333333336
        7776633367777777777777777763333333336666666633333333333367763367777763336633336677766333677777777777777777633333333366666666333333333333677633677777633366333366
        7777633367777777777777777633333333366666666663333333333367763367777763367663366777776333677777777777777776333333333666666666633333333333677633677777633676633667
        7777763367777777777777776633333333366666666663333333333367763367777763367763367777777633677777777777777766333333333666666666633333333333677633677777633677633677
        7777763367777777776666666333333333666666666663333333333367763367777763367763367777777633677777777766666663333333336666666666633333333333677633677777633677633677
        7777776367777777776333333333333333666666666663333333333367776667777763677763367777777763677777777763333333333333336666666666633333333333677766677777636777633677
        7777776367777777776333333333333333666666666666333333333366777777777766677766667777777763677777777763333333333333336666666666663333333333667777777777666777666677
        7777776367777777776333666666666333666666666666333333333336677777777776677666677777777763677777777763336666666663336666666666663333333333366777777777766776666777
        7777776667777777776366677777776663666666666666333333333333666677777777777666677777777766677777777763666777777766636666666666663333333333336666777777777776666777
        7777776667777777776667777777777766666666666666333366666633333677777777777666677777777766677777777766677777777777666666666666663333666666333336777777777776666777
        7777776667777777776677777777777776666666666666366677777666333677777777776666677777777766677777777766777777777777766666666666663666777776663336777777777766666777
        7777777667777777776777777777777777666666666666667777777776633677777766666666677777777776677777777767777777777777776666666666666677777777766336777777666666666777
        7777777667777777766777777777777777666666666666677777777777663677777766666666677777777776677777777667777777777777776666666666666777777777776636777777666666666777
        7777777667777777767777777777777777766666666666777777777777766677777766666666677777777776677777777677777777777777777666666666667777777777777666777777666666666777
        7777777667777777667777777777777777766666666666777777777777766677777766666666677777777776677777776677777777777777777666666666667777777777777666777777666666666777
        7777777667777777677777777777777777776666666666777777777777766677777766666666677777777776677777776777777777777777777766666666667777777777777666777777666666666777
        7777777667777733333333777777777777776666666666777777773333333377777766666666677777777776677777333333337777777777777766666666667777777733333333777777666666666777
        777777766777333aaaaaa3333777777777776666666666777777333aaaaaa3333777666666666777777777766777333aaaaaa3333777777777776666666666777777333aaaaaa3333777666666666777
        7777777666333aaaaaaaaaaa33377777777766666666667777333aaaaaaaaaaa33376666666667777777777666333aaaaaaaaaaa33377777777766666666667777333aaaaaaaaaaa3337666666666777
        77777776633aaaaaaaaaaaaaaa3337777777666666666677733aaaaaaaaaaaaaaa3336666666677777777776633aaaaaaaaaaaaaaa3337777777666666666677733aaaaaaaaaaaaaaa33366666666777
        7777777333aaaaaaaaaaaaaaaaaa3333777766666666666333aaaaaaaaaaaaaaaaaa3333666667777777777333aaaaaaaaaaaaaaaaaa3333777766666666666333aaaaaaaaaaaaaaaaaa333366666777
        33777333aaaaaaaaaaaaaaaaaaaaaaa33333333333666333aaaaaaaaaaaaaaaaaaaaaaa33333333333777333aaaaaaaaaaaaaaaaaaaaaaa33333333333666333aaaaaaaaaaaaaaaaaaaaaaa333333333
        a33333aaaaaaaaaaaaaaaaaaaaaaaaaaa33aaaaaa33333aaaaaaaaaaaaaaaaaaaaaaaaaaa33aaaaaa33333aaaaaaaaaaaaaaaaaaaaaaaaaaa33aaaaaa33333aaaaaaaaaaaaaaaaaaaaaaaaaaa33aaaaa
        aaa33aaaaaaaaaaaaaaaaaaaaaaaaa333aaaaaaaaaa33aaaaaaaaaaaaaaaaaaaaaaaaa333aaaaaaaaaa33aaaaaaaaaaaaaaaaaaaaaaaaa333aaaaaaaaaa33aaaaaaaaaaaaaaaaaaaaaaaaa333aaaaaaa
        aaaaa33aaaaaaaaaaaaaaaaaaaaa33aaaaaaaaaaaaaaa33aaaaaaaaaaaaaaaaaaaaa33aaaaaaaaaaaaaaa33aaaaaaaaaaaaaaaaaaaaa33aaaaaaaaaaaaaaa33aaaaaaaaaaaaaaaaaaaaa33aaaaaaaaaa
        aaaaaaa333aaaaaaaaaaaaaaaa33aaaaaaaaaaaaaaaaaaa333aaaaaaaaaaaaaaaa33aaaaaaaaaaaaaaaaaaa333aaaaaaaaaaaaaaaa33aaaaaaaaaaaaaaaaaaa333aaaaaaaaaaaaaaaa33aaaaaaaaaaaa
        aaaaaaaaaa333aaaaaaaaaaa33aaaaaaaaaaaaaaaaaaaaaaaa333aaaaaaaaaaa33aaaaaaaaaaaaaaaaaaaaaaaa333aaaaaaaaaaa33aaaaaaaaaaaaaaaaaaaaaaaa333aaaaaaaaaaa33aaaaaaaaaaaaaa
        aaaaaaaaaaaa333aaaaaaa33aaaaaaaaaaaaaaaaaaaaaaaaaaaa333aaaaaaa33aaaaaaaaaaaaaaaaaaaaaaaaaaaa333aaaaaaa33aaaaaaaaaaaaaaaaaaaaaaaaaaaa333aaaaaaa33aaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaa333aaa33aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa333aaa33aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa333aaa33aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa333aaa33aaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaa3333aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa3333aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa3333aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa3333aaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        `)
    tiles.setCurrentTilemap(tilemap`level3`)
    for (let value3 of tiles.getTilesByType(assets.tile`chest`)) {
        sandcastleSprite = sprites.create(img`
            ....................8a8aa8a8....................
            .................aaa888aa8a8aaa.................
            ..............aaa8aa8a8aa888aa8aaa..............
            ...........8aa8aa8888a8aa8a8888aa8aa8...........
            ........8888aa8aa8aa8a8aa8a8aa8aa8aa8888........
            .....aaa8aa8aa8888aa8a8aa8a8aa8888aa8aa8aaa.....
            ...aa8888aa8aa8aa8aa888aa888aa8aa8aa8aa8888aa...
            dccaa8aa8aa8888aa8aa8a8aa8a8aa8aa8888aa8aa8aaccd
            bcb888aa8aa8aa8aa8aa8a8aa8a8aa8aa8aa8aa8aa888bcb
            dbbaa8aa8888aa8aa8888a8aa8a8888aa8aa8888aa8aabbd
            dbbaa8aa8aa8aa8888aa8a8aa8a8aa8888aa8aa8aa8aabbd
            dccaa8888aa8aa8aa8aa888aa888aa8aa8aa8aa8888aaccd
            bcbaa8aa8aa8888aa8aa8a8aa8a8aa8aa8888aa8aa8aabcb
            dbb888aa8aa8aa8aa8aa8a8aa8a8aa8aa8aa8aa8aa888bbd
            dbbaa8aa8888aa8aa8aa8a8aa8a8aa8aa8aa8888aa8aabbd
            dccaa8aa8aa8aa8aa8888a8aa8a8888aa8aa8aa8aa8aaccd
            bcbaa8888aa8aa8888aa888aa888aa8888aa8aa8888aabcb
            dbbaa8aa8aa8888aa8aa8a8aa8a8aa8aa8888aa8aa8aabbd
            dbb888aa8aa8aa8aa8aa8a8aa8a8aa8aa8aa8aa8aa888bbd
            dccaa8aa8888aa8aa8aa8a8aa8a8aa8aa8aa8888aa8aaccd
            bcbaa8aa8aa8aa8aa8aa888aa888aa8aa8aa8aa8aa8aabcb
            dbbaa8888aa8aa8aa888ccbbbbcc888aa8aa8aa8888aabbd
            dbbaa8aa8aa8aa888ccbbbbbbbbbbcc888aa8aa8aa8aabbd
            dcc888aa8aa888ccbbbbbccccccbbbbbcc888aa8aa888ccd
            bcbaa8aa888ccbbbbbccbddddddbccbbbbbcc888aa8aabcb
            dbbaa8aaccbbbbbccbddddddddddddbccbbbbbccaa8aabbd
            dbbaaccbbbbcccbddddddddddddddddddbcccbbbbccaabbd
            dcccbbbbcccbdddbccbbbbbbbbbbbbccbdddbcccbbbbcccd
            ccccccccbbbbbbbcbddddddddddddddbcbbbbbbbcccccccc
            bddddddddddddbcddddddddddddddddddcbddddddddddddb
            bbcbdddddddddcbd1111111111111111dbcdddddddddbcbb
            bbbcccccccccccd1bbbbbbbbbbbbbbbb1dcccccccccccbbb
            bbbbdddddddddc11beeeeeeeeeeeeeeb11cdddddddddbbbb
            bbb8aaaaaaa8dc1be3b33b33b33b33beb1cd8aaaaaaa8bbb
            bbb888888888dc1be3b33b33b33b33beb1cd888888888bbb
            bbb833333338dcbbf3b3effffffe33bebbcd833333338bbb
            bbb83ff3ff38dcbbf3bffffffffff3bebbcd83ff3ff38bbb
            bbb83cc3cc38dcbbf3effffffffffebebbcd83cc3cc38bbb
            bbb833333338dcbbf3eeeeeeeeeeeebebbcd833333338bbb
            cbb83ff3ff38dcbbe3b33b33b33b33bebbcd83ff3ff38bbc
            cbb83cc3cc38dcbbe3b33b33b33b33bebbcd83cc3cc38bbc
            ccbbbbbbbbbbdcbbe3b33b33b33feeeebbcdbbbbbbbbbbcc
            .cbbdddddddddcbbe3b33b33b33ffffebbcdddddddddbbc.
            ..cbdbbbdbbbdcbbf3b33b33b33f33febbcdbbbdbbbdbc..
            ...cdbbbdbbbdcbbf3b33b33b33bffeebbcdbbbdbbbdc...
            ....bddddddddcbbf3b33b33b33b33bebbcddddddddb....
            .....bdbbbdddcbbf3b33b33b33b33bebbcdddbbbdb.....
            ......bcccbbbcbbe3b33b33b33b33bebbcbbbcccb......
            `, SpriteKind.Castle)
        tiles.placeOnTile(sandcastleSprite, value3)
        tiles.setTileAt(value3, assets.tile`transparency16`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Collectible, function (sprite, otherSprite) {
    info.changeScoreBy(50)
    sprites.destroy(otherSprite)
})
function level0 () {
    scene.setBackgroundColor(8)
    tiles.setCurrentTilemap(tilemap`level2`)
    for (let value3 of tiles.getTilesByType(assets.tile`chest`)) {
        chestSprite = sprites.create(img`
            . . f f f f f f f f f f f f . . 
            . f 4 a a a a a a a a a a 4 f . 
            f 3 a a a a a a a a a a a a 3 f 
            f 3 a a a a a a a a a a a a 3 f 
            f 3 a a a a a a a a a a a a 3 f 
            f 3 3 a a a a a a a a a a 3 3 f 
            f 3 3 3 3 3 3 3 3 3 3 3 3 3 3 f 
            f 3 3 3 3 3 3 3 3 3 3 3 3 3 3 f 
            f f f f f f f 5 5 f f f f f f f 
            1 f f f f f f c c f f f f f f 1 
            1 1 1 1 1 1 f c c f 1 1 1 1 1 1 
            f 3 3 3 3 3 1 f f 1 3 3 3 3 3 f 
            f 3 3 3 3 3 3 3 3 3 3 3 3 3 3 f 
            f 1 3 3 3 3 3 3 3 3 3 3 3 3 1 f 
            f f f f f f f f f f f f f f f f 
            . f f . . . . . . . . . . f f . 
            `, SpriteKind.Chest)
        tiles.placeOnTile(chestSprite, value3)
        ghostSprite = sprites.create(assets.image`ghost`, SpriteKind.Enemy)
        tiles.placeOnTile(ghostSprite, value3)
        tiles.setTileAt(value3, assets.tile`transparency16`)
        sprites.setDataSprite(chestSprite, "Ghost", ghostSprite)
    }
    music.setVolume(10)
    music.play(music.createSong(assets.song`AmazingSong`), music.PlaybackMode.LoopingInBackground)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Life, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    sprites.destroy(otherSprite)
    sprite.startEffect(effects.hearts, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.GoldCollectible, function (sprite, otherSprite) {
    totalGoldCollectibles += -1
    info.changeScoreBy(100)
    sprites.destroy(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Goal, function (sprite, otherSprite) {
    if (totalGoldCollectibles == 0) {
        game.gameOver(true)
    } else {
        crabSprite.sayText("You need to find " + totalGoldCollectibles + " more pearls!", 500, false)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Clam, function (sprite, otherSprite) {
    otherSprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    otherSprite.setImage(img`
        . . . . . f c c c c f . . . . . 
        . . c c f b b 3 3 b b f c c . . 
        . c b 3 3 b b c c b b 3 3 b c . 
        . f 3 c c c b c c b c c c 3 f . 
        f c b b c c b c c b c c b b c f 
        c 3 c c b c c c c c c b c c 3 c 
        c 3 c c c c c c c c c c c c 3 c 
        . f b b c c c c c c c c b b f . 
        . . f b b c c c c c c b b f . . 
        . . c c c f f f f f f c c c . . 
        . c 3 f f f f f f f f f f 3 c . 
        c 3 f f f f f f f f f f f f 3 c 
        f 3 c c f f f f f f f f c c 3 f 
        f b 3 c b b f b b f b b c 3 b f 
        . c b b 3 3 b 3 3 b 3 3 b b c . 
        . . f f f f f f f f f f f f . . 
        `)
    dustSprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Dust)
    dustSprite.scale = 4
    dustSprite.lifespan = 501
    animation.runImageAnimation(
    dustSprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 4 4 . . . . . . . 
        . . . . . . 4 1 1 4 . . . . . . 
        . . . . . . 4 1 1 4 . . . . . . 
        . . 4 5 5 4 1 1 1 1 4 5 5 . . . 
        . . 4 4 1 1 1 1 1 1 1 1 4 4 . . 
        . . 4 4 1 1 1 1 1 1 1 1 4 4 . . 
        . . . 4 1 1 1 1 1 1 1 1 4 . . . 
        . . . . 4 1 1 1 1 1 1 4 . . . . 
        . . . . 5 1 1 1 1 1 1 5 . . . . 
        . . . . 5 1 1 4 4 1 1 5 . . . . 
        . . . . 4 4 4 5 5 5 4 4 . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . 4 1 1 4 . . . . . . 
        . . . . . 5 1 1 1 1 5 . . . . . 
        . . . . . 5 1 1 1 1 5 . . . . . 
        . . . . . . 4 1 1 4 . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . 4 4 . . . . . . . . 
        . . . . . . 4 1 4 . . . . . . . 
        . . 4 4 . . 4 1 4 . . 4 4 . . . 
        . . 4 1 4 . 4 1 4 5 4 1 4 . . . 
        . . . 4 1 4 4 1 4 5 1 4 . . . . 
        4 4 4 4 5 1 4 1 1 1 4 . . . . . 
        4 1 1 1 1 1 1 1 1 5 4 4 4 4 4 4 
        . 4 4 4 5 4 1 1 1 1 1 1 1 1 1 4 
        . . . . . 5 1 1 1 4 4 5 4 4 4 . 
        . . . . 4 1 4 1 4 1 5 . . . . . 
        . . . 4 1 4 5 1 4 4 1 4 . . . . 
        . . 4 1 4 . 5 1 4 . 4 1 4 . . . 
        . . 4 4 . . 4 1 4 . . 4 4 . . . 
        . . . . . . 4 1 4 . . . . . . . 
        . . . . . . 4 1 4 . . . . . . . 
        . . . . . . 4 4 . . . . . . . . 
        `,img`
        . . 4 4 . . . 4 4 . . . . . . . 
        . 4 1 1 5 . . 4 1 4 . . 4 4 4 . 
        . 4 1 1 5 . . 4 1 4 . 4 1 1 4 . 
        . . 4 5 5 . . 5 1 5 . 5 1 1 4 . 
        . 4 4 . . . . . 5 5 . 5 5 5 . . 
        4 1 1 5 5 . . . . . . . 4 4 . . 
        4 1 1 1 5 . . . . . . 5 1 1 4 4 
        4 1 1 5 . . . . . . 4 1 1 1 1 4 
        . 4 5 5 . . . . . . . 5 1 1 4 . 
        . . . . . . . 5 . . . . 4 4 . . 
        . . 5 5 5 . 5 1 5 . . 5 5 5 . . 
        . 4 1 1 5 5 4 1 1 5 . 5 1 1 4 4 
        4 1 1 1 5 5 1 1 1 5 . 5 1 1 1 4 
        4 1 1 4 . . 4 1 4 . . . 4 1 1 4 
        4 4 4 . . . . 4 4 . . . . 4 4 . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . 4 . . . . . 
        . . . . . 4 . . . . 4 4 . . . . 
        . . . . 4 4 . . . . . 4 . . . . 
        . . . . 4 . . . 4 . . . . . . . 
        . . . . . . . . 4 . . . . . . . 
        . 4 . . . . . . . . . . 4 . . . 
        4 4 . . . . . . . . . . 4 4 . . 
        4 . . . . . . . . . . . . 4 . . 
        . . . . . . . . . . . . . . . . 
        . . . 4 . . . 4 . . . . . 4 . . 
        . . 4 4 . . . 4 . . . . . 4 4 . 
        . . 4 . . . . 4 . . . . . . 4 . 
        `],
    100,
    false
    )
    dustSprite.setPosition(otherSprite.x, otherSprite.y)
    dustSprite.y += -25
    pause(500)
    pearl = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 8 9 9 8 . . . . . . 
        . . . . . . 9 3 1 9 . . . . . . 
        . . . . . . 9 3 3 9 . . . . . . 
        . . . . . . 8 9 9 8 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.GoldCollectible)
    pearl.scale = 1.5
    pearl.setPosition(otherSprite.x, otherSprite.y)
    pearl.y += -25
})
function createPlayer () {
    dogSprite = sprites.create(img`
        . . 4 4 4 . . . . 4 4 4 . . . . 
        . 4 e e e 4 . . 4 e e e 4 . . . 
        4 e e e e e 4 4 e e e e e 4 . . 
        4 e e 4 4 e e e e 4 4 e e 4 . . 
        4 e 4 4 e e e e e e 4 4 e 4 . . 
        . 4 4 e e e e e e e e 4 4 . . . 
        . . 4 e f e e e e f e 4 . . . . 
        . . f e e e 4 4 e e e f . . f f 
        . . f 4 e e f f e e a f . f e f 
        . . . f a a a a a a 4 4 f e e f 
        . . . f 4 e e e e e e 4 4 e f . 
        . . . f e e e e e 4 e e f f . . 
        . . . f e f f f e f f e f . . . 
        . . . f f . . f f . . f f . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    controller.moveSprite(dogSprite, 100, 0)
    tiles.placeOnRandomTile(dogSprite, assets.tile`myTile`)
    dogSprite.ay = 250
    scene.cameraFollowSprite(dogSprite)
    characterAnimations.loopFrames(
    dogSprite,
    [img`
        . . 4 4 4 . . . . 4 4 4 . . . . 
        . 4 e e e 4 . . 4 e e e 4 . . . 
        4 e e e e e 4 4 e e e e e 4 . . 
        4 e e 4 4 e e e e 4 4 e e 4 . . 
        4 e 4 4 e e e e e e 4 4 e 4 . . 
        . 4 4 e e e e e e e e 4 4 . . . 
        . . 4 e f e e e e f e 4 . . . . 
        . . f e e e 4 4 e e e f . . f f 
        . . f 4 e e f f e e a f . f e f 
        . . . f a a a a a a 4 4 f e e f 
        . . . f 4 e e e e e e 4 4 e f . 
        . . . f e e e e e 4 e e f f . . 
        . . . f e f f f e f f e f . . . 
        . . . f f . . f f . . f f . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . 4 4 4 . . . . 4 4 4 . . . . 
        . 4 e e e 4 . . 4 e e e 4 . . . 
        4 e e e e e 4 4 e e e e e 4 . . 
        4 e e 4 4 e e e e 4 4 e e 4 . . 
        4 e 4 4 e e e e e e 4 4 e 4 . . 
        . 4 4 e e e e e e e e 4 4 . . . 
        . . 4 e f e e e e f e 4 . . . . 
        . . f e e e 4 4 e e e f . f f . 
        . . . 4 e e f f e e a f f e f . 
        . . . f a a a a a a 4 4 4 e f . 
        . . . f e e e e e e e f f f . . 
        . . . f e 4 e f f f e f . . . . 
        . . . f f f f f . . f f . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . 4 4 4 . . . . 4 4 4 . . . . 
        . 4 e e e 4 . . 4 e e e 4 . . . 
        4 e e e e e 4 4 e e e e e 4 . . 
        4 e e 4 4 e e e e 4 4 e e 4 . . 
        4 e 4 4 e e e e e e 4 4 e 4 . . 
        . 4 4 e e e e e e e e 4 4 . . . 
        . . 4 e f e e e e f e 4 . . . . 
        . . f e e e 4 4 e e e f . f f . 
        . . . 4 e e f f e e a f f e f . 
        . . . f a a a a a a 4 f e e f . 
        . . . f e e e e e e e 4 e f . . 
        . . . . f e 4 e f e f f f . . . 
        . . . . . f f f f f f f . . . . 
        `],
    100,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.Moving, Predicate.HittingWallDown)
    )
    characterAnimations.loopFrames(
    dogSprite,
    [img`
        . . . . 4 4 4 . . . . 4 4 4 . . 
        . . . 4 e e e 4 . . 4 e e e 4 . 
        . . 4 e e e e e 4 4 e e e e e 4 
        . . 4 e e 4 4 e e e e 4 4 e e 4 
        . . 4 e 4 4 e e e e e e 4 4 e 4 
        . . . 4 4 e e e e e e e e 4 4 . 
        . . . . 4 e f e e e e f e 4 . . 
        f f . . f e e e 4 4 e e e f . . 
        f e f . f a e e f f e e 4 f . . 
        f e e f 4 4 a a a a a a f . . . 
        . f e 4 4 e e e e e e 4 f . . . 
        . . f f e e 4 e e e e e f . . . 
        . . . f e f f e f f f e f . . . 
        . . . f f . . f f . . f f . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . 4 4 4 . . . . 4 4 4 . . 
        . . . 4 e e e 4 . . 4 e e e 4 . 
        . . 4 e e e e e 4 4 e e e e e 4 
        . . 4 e e 4 4 e e e e 4 4 e e 4 
        . . 4 e 4 4 e e e e e e 4 4 e 4 
        . . . 4 4 e e e e e e e e 4 4 . 
        . . . . 4 e f e e e e f e 4 . . 
        . f f . f e e e 4 4 e e e f . . 
        . f e f f a e e f f e e 4 . . . 
        . f e 4 4 4 a a a a a a f . . . 
        . . f f f e e e e e e e f . . . 
        . . . . f e f f f e 4 e f . . . 
        . . . . f f . . f f f f f . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . 4 4 4 . . . . 4 4 4 . . 
        . . . 4 e e e 4 . . 4 e e e 4 . 
        . . 4 e e e e e 4 4 e e e e e 4 
        . . 4 e e 4 4 e e e e 4 4 e e 4 
        . . 4 e 4 4 e e e e e e 4 4 e 4 
        . . . 4 4 e e e e e e e e 4 4 . 
        . . . . 4 e f e e e e f e 4 . . 
        . f f . f e e e 4 4 e e e f . . 
        . f e f f a e e f f e e 4 . . . 
        . f e e f 4 a a a a a a f . . . 
        . . f e 4 e e e e e e e f . . . 
        . . . f f f e f e 4 e f . . . . 
        . . . . f f f f f f f . . . . . 
        `],
    100,
    characterAnimations.rule(Predicate.FacingRight, Predicate.Moving, Predicate.HittingWallDown)
    )
    characterAnimations.loopFrames(
    dogSprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . 4 4 4 . . . . 4 4 4 . . . . 
        . 4 e e e 4 . . 4 e e e 4 . . . 
        4 e e e e e 4 4 e e e e e 4 . . 
        4 e e 4 4 e e e e 4 4 e e 4 . . 
        4 e 4 4 e e e e e e 4 4 e 4 . . 
        . 4 4 e e e e e e e e 4 4 . . . 
        . . 4 e f e e e e f e 4 . . . . 
        . . f e e e 4 4 e e e f . f f . 
        . . . 4 e e f f e e a f f e f . 
        . . . f a a a a a a 4 4 4 e f . 
        . . . f e e e e e e e f f f . . 
        . . . f e 4 e f f f e f . . . . 
        . . . f f f f f . . f f . . . . 
        `],
    100,
    characterAnimations.rule(Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    dogSprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . 4 4 4 . . . . 4 4 4 . . 
        . . . 4 e e e 4 . . 4 e e e 4 . 
        . . 4 e e e e e 4 4 e e e e e 4 
        . . 4 e e 4 4 e e e e 4 4 e e 4 
        . . 4 e 4 4 e e e e e e 4 4 e 4 
        . . . 4 4 e e e e e e e e 4 4 . 
        . . . . 4 e f e e e e f e 4 . . 
        . f f . f e e e 4 4 e e e f . . 
        . f e f f a e e f f e e 4 . . . 
        . f e 4 4 4 a a a a a a f . . . 
        . . f f f e e e e e e e f . . . 
        . . . . f e f f f e 4 e f . . . 
        . . . . f f . . f f f f f . . . 
        `],
    100,
    characterAnimations.rule(Predicate.FacingRight)
    )
}
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    if (sprites.readDataBoolean(sprite, "isFake")) {
        doggyBone = sprites.create(img`
            . . c 1 1 b c . . . . . . . . . 
            . c b d 1 d c . . . . . . . . . 
            c 1 d d 1 1 c . . . . . . . . . 
            c 1 1 1 1 1 b . . . . . . . . . 
            b b d 1 1 1 d c . . . . . . . . 
            . b b b b 1 1 1 c . . . . . . . 
            . . . . . b 1 1 1 c . . . . . . 
            . . . . . . b 1 1 1 d . . . . . 
            . . . . . . . c 1 1 1 b . . . . 
            . . . . . . . . c 1 1 b b b b . 
            . . . . . . . . b d 1 1 1 d b b 
            . . . . . . . . . b 1 1 1 1 1 c 
            . . . . . . . . . c 1 1 d d 1 c 
            . . . . . . . . . c d 1 d b c . 
            . . . . . . . . . c b 1 1 c . . 
            . . . . . . . . . . c c c . . . 
            `, SpriteKind.Collectible)
        doggyBone.setPosition(sprite.x, sprite.y)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite)
    sprite.startEffect(effects.coolRadial, 500)
})
let mrVenomousSprite: Sprite = null
let pearl: Sprite = null
let ghostSprite: Sprite = null
let chestSprite: Sprite = null
let sandcastleSprite: Sprite = null
let goldDoggyBone: Sprite = null
let dustSprite: Sprite = null
let fvCatSprite: Sprite = null
let doggyBone: Sprite = null
let heartSprite: Sprite = null
let totalGoldCollectibles = 0
let crabSprite: Sprite = null
let clownFishSprite: Sprite = null
let clamSprite: Sprite = null
let dogSprite: Sprite = null
let toySprite: Sprite = null
let canJump = false
let currentLevel = 0
currentLevel = 2
info.setScore(0)
info.setLife(5)
canJump = false
createLevel()
createPlayer()
game.onUpdateInterval(5000, function () {
    mrVenomousSprite = sprites.create(img`
        . . . . 7 7 6 6 7 . . . . . . . 
        . . . 7 7 2 2 f 6 7 . . . . . . 
        . . . 7 6 7 f 6 2 7 . . . . . . 
        . . . 7 2 6 2 2 2 7 . . . . . . 
        . . . 7 2 6 6 2 2 7 . . . . . . 
        . . . 7 2 2 6 6 2 7 . . . . . . 
        . . . . 7 2 2 2 7 . . . . . . . 
        . . . . . 4 7 7 4 6 6 4 . . . . 
        . . . . . . 4 7 7 4 4 . . . . . 
        . . . . . . . 4 7 7 4 . . . . . 
        . . . . . 6 4 . 4 7 4 . . . . . 
        . . . . 6 6 4 . 4 7 4 . . . . . 
        . . . . 4 4 . 4 6 4 . . . . . . 
        . . . . . . 4 6 4 . . . . . . . 
        . . . . . 4 7 4 . . . . . . . . 
        . . . . . 4 7 7 6 . . . . . . . 
        `, SpriteKind.Enemy)
    mrVenomousSprite.setPosition(dogSprite.x, dogSprite.y - 60)
    mrVenomousSprite.lifespan = 6000
    mrVenomousSprite.ay = 100
    mrVenomousSprite.setVelocity(randint(-25, 25), 0)
    mrVenomousSprite.setBounceOnWall(true)
})
forever(function () {
    for (let value4 of sprites.allOfKind(SpriteKind.Chest)) {
        spriteutils.placeAngleFrom(
        sprites.readDataSprite(value4, "Ghost"),
        game.runtime() / 1000,
        25,
        value4
        )
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Clam)) {
        spriteutils.placeAngleFrom(
        sprites.readDataSprite(value4, "Ghost"),
        game.runtime() / 1000,
        25,
        value4
        )
    }
})
