import { CombatReady } from "./combatReady";
export const MODULE_NAME = "combatready";

export function getCanvas(): Canvas {
    if (!(canvas instanceof Canvas) || !canvas.ready) {
        throw new Error('Canvas Is Not Initialized');
    }
    return canvas;
}

export function getGame(): Game {
    if (!(game instanceof Game)) {
        throw new Error('Game Is Not Initialized');
    }
    return game;
}

export function getCombats(): CombatEncounters {
    if (!(getGame().combats instanceof CombatEncounters)) {
        throw new Error('CombatEncounters Is Not Initialized');
    }
    return <CombatEncounters>getGame().combats;
}

export const registerSettings = () => {
    // module settings
    getGame().settings.register(MODULE_NAME, "timeractive", {
        name: "Combat Ready Timer Active",
        scope: "world",
        config: false,
        default: false,
        type: Boolean,
        onChange: () => {
            //NOOP
        },
    });

    getGame().settings.register(MODULE_NAME, "timemax", {
        name: "CombatReady.TimeMax",
        hint: "CombatReady.TimeMaxHint",
        scope: "world",
        config: true,
        default: 3,
        type: Number,
        onChange: (value) => {
            let val = Number(value);
            if (isNaN(val) || val <= 0) {
                getGame().settings.set(MODULE_NAME, "timemax", 3);
                return;
            }
            if (val > 30) {
                getGame().settings.set(MODULE_NAME, "timemax", 30);
                return;
            }
            CombatReady.setTimeMax(val * 60);
        },
    });
    getGame().settings.register(MODULE_NAME, "disablenextup", {
        name: "CombatReady.DisableNextUp",
        hint: "CombatReady.DisableNextUpHint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });
    getGame().settings.register(MODULE_NAME, "disablenextuplingering", {
        name: "CombatReady.DisableNextUpLingering",
        hint: "CombatReady.DisableNextUpLingeringHint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });
    getGame().settings.register(MODULE_NAME, "animationstyle", {
        name: "CombatReady.AnimationStyle",
        hint: "CombatReady.AnimationStyleHint",
        scope: "world",
        config: true,
        default: "Complete",
        choices: {
            "Complete": "CombatReady.AnimationStyleComplete",
            "Reduced": "CombatReady.AnimationStyleReduced",
            "None": "CombatReady.AnimationStyleNone"
        },
        type: String,
    });
    getGame().settings.register(MODULE_NAME, "disablenextuponlastturn", {
        name: "CombatReady.DisableNextUpOnLastTurn",
        hint: "CombatReady.DisableNextUpOnLastTurnHint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });
    getGame().settings.register(MODULE_NAME, "disabletimer", {
        name: "CombatReady.DisableTimer",
        hint: "CombatReady.DisableTimerHint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });
    getGame().settings.register(MODULE_NAME, "disabletimerGM", {
        name: "CombatReady.DisableTimerGM",
        hint: "CombatReady.DisableTimerGMHint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });
    getGame().settings.register(MODULE_NAME, "endturndialog", {
        name: "CombatReady.ShowEndTurnDialog",
        hint: "CombatReady.ShowEndTurnDialogHint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });
    getGame().settings.register(MODULE_NAME, "wrapitupdialog", {
        name: "CombatReady.ShowWrapItUpDialog",
        hint: "CombatReady.ShowWrapItUpDialogHint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });
    getGame().settings.register(MODULE_NAME, "ticksound", {
        name: "CombatReady.TickSound",
        hint: "CombatReady.TickSoundHint",
        scope: "world",
        config: true,
        choices: {
            "Everyone": "CombatReady.Everyone",
            "OnlyPlayers": "CombatReady.OnlyPlayers",
            "Player": "CombatReady.CurrentCombatant",
            "GM": "CombatReady.GM",
            "GM+Player": "CombatReady.GMAndPlayer",
            "None": "CombatReady.None"
        },
        default: "Everyone",
        type: String,
    });
    getGame().settings.register(MODULE_NAME, "expiresound", {
        name: "CombatReady.ExpireSound",
        hint: "CombatReady.ExpireSoundHint",
        scope: "world",
        config: true,
        choices: {
            "Everyone": "CombatReady.Everyone",
            "OnlyPlayers": "CombatReady.OnlyPlayers",
            "Player": "CombatReady.CurrentCombatant",
            "GM": "CombatReady.GM",
            "GM+Player": "CombatReady.GMAndPlayer",
            "None": "CombatReady.None"
        },
        default: "Everyone",
        type: String,
    });
    getGame().settings.register(MODULE_NAME, "roundsound", {
        name: "CombatReady.RoundSound",
        hint: "CombatReady.RoundSoundHint",
        scope: "world",
        config: true,
        choices: {
            "Everyone": "CombatReady.Everyone",
            "OnlyPlayers": "CombatReady.OnlyPlayers",
            "GM": "CombatReady.GM",
            "None": "CombatReady.None"
        },
        default: "Everyone",
        type: String,
    });
    getGame().settings.register(MODULE_NAME, "tickonlast", {
        name: "CombatReady.TickOnLast",
        hint: "CombatReady.TickOnLastHint",
        scope: "world",
        config: true,
        default: 10,
        type: Number,
        onChange: (value) => {
            let val = Number(value);
            if (isNaN(val) || val < 0) {
                getGame().settings.set(MODULE_NAME, "tickonlast", 0);
                return;
            }
        },
    });
    getGame().settings.register(MODULE_NAME, "volume", {
        name: "CombatReady.Volume",
        hint: "CombatReady.VolumeHint",
        scope: "client",
        config: true,
        //@ts-ignore
        range: {
            min: 0,
            max: 100,
            step: 10,
        },
        default: 60,
        type: Number,
    });
};