namespace SpriteKind {
    export const Life = SpriteKind.create()
    export const Collectible = SpriteKind.create()
    export const Chest = SpriteKind.create()
    export const GoldCollectible = SpriteKind.create()
    export const Dust = SpriteKind.create()
    export const Distraction = SpriteKind.create()
    export const Clam = SpriteKind.create()
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
function createLevel () {
    if (currentLevel == 0) {
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
    } else if (currentLevel == 1) {
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
            `, SpriteKind.Player)
    }
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
    totalGoldCollectibles = sprites.allOfKind(SpriteKind.GoldCollectible).length
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Collectible, function (sprite, otherSprite) {
    info.changeScoreBy(50)
    sprites.destroy(otherSprite)
})
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
let goldDoggyBone: Sprite = null
let dustSprite: Sprite = null
let totalGoldCollectibles = 0
let fvCatSprite: Sprite = null
let doggyBone: Sprite = null
let heartSprite: Sprite = null
let crabSprite: Sprite = null
let clownFishSprite: Sprite = null
let clamSprite: Sprite = null
let ghostSprite: Sprite = null
let chestSprite: Sprite = null
let dogSprite: Sprite = null
let toySprite: Sprite = null
let canJump = false
let currentLevel = 0
currentLevel = 1
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
