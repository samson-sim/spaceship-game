export const appConstants = {
    size: {
        width: 1280,
        height: 720
    },
    containers: {
        player: 'player',
        bullets: 'bullets',
        meteors: 'meteors',
        boss: 'boss',
        bombs: 'bombs'
    },
    timeouts: {
        playerShoots: 200
    },
    events: {
        gameOver: 'gameOver',
        youWin: 'youWin',
        meteorDestroyed: 'meteorDestroyed',
        startBoss: 'startBoss',
        bulletShoot: 'bulletShoot',
        bossShoot: 'bossShoot',
        endGame: 'endGame'
    },
    probability: {
        bossChangeDirection: 1,
        bomb: 3,
        initialHp: 4
    },
    defaultBulletsCount: 10,
    bossHitPoints: 4
};
