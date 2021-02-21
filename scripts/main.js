/*
    There is no point creating separate files for small things.
    All the contents modified may include modded content as well.
*/

const init = () => {
    /* Unlock all locked contents. */
    const contents = [ContentType.block, ContentType.item, ContentType.liquid, ContentType.unit, ContentType.sector];

    for(let content of contents){
        Vars.content.getBy(content).each(c => c.alwaysUnlocked = true);
    };

    Vars.content.blocks().each(b => {
        /* Set build visibility to shown for everything that isn't visible. */
        if(b.buildVisibility != BuildVisibility.shown) b.buildVisibility = BuildVisibility.shown;

        /* Set core unit capacity to max integer. */
        if(b instanceof CoreBlock) b.unitCapModifier = 32767;

        /* Set reconstructor's cost to none. */
        if(b instanceof Reconstructor){
            b.constructTime = 0;
            b.consumes.items();
        };

        /* Set turret's attribute. */
        if(b instanceof Turret){
            b.reloadTime = 0;
            b.spread = 0;
            b.inaccuracy = 0;
            b.recoilAmount = 0;
            b.restitution = 0;
            b.xRand = 0;
            b.cooldown = 10;
            b.rotateSpeed = Number.MAX_VALUE;
            b.targetGround = true;
            b.targetAir = true;
            if(typeof(b.shootType) !== "undefined"){
                let s = b.shootType;

                if(s.collidesGround != null) s.collidesGround = true;
                if(s.collidesAir != null) s.collidesAir = true;
            };
        };
    });

    /* Ask for permission to enable "cursed" mode. */
    Events.on(ClientLoadEvent, e => {
        Vars.ui.showCustomConfirm("$cursed.title", "$cursed.text", "$yes", "$no", () => {
            Vars.content.blocks().each(b => {
                if(b.size == 3) b.size = 1;
                if(b.size == 4) b.size = 2;
            });
        }, () => {
            Vars.ui.showCustomConfirm("$secret.title", "$secret.text", "$yes", "$no", () => {
                Core.app.openURI("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
            }, () => {
                Core.app.openURI("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
            });
        });
    });
};

const mapVariable = extend(SectorPreset, "mewsmap", Planet.serpulo, 174 , {
    localizedName: "sadland",
    description: "youll never smile again",
    difficulty: 1
})

init();
