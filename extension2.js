
import St from 'gi://St';
import Clutter from 'gi://Clutter';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';

import GLib from 'gi://GLib';


let panelButton;

function init () {
// Create a Button with "Hello World" text
panelButton = new St.Bin({
    style_class : "panel-button",
});

let fileContents = "hiiii";

let panelButtonText = new St.Label({
    text : fileContents,
    y_align: Clutter.ActorAlign.CENTER,
});
panelButton.set_child(panelButtonText);
}

function enable () {
// Add the button to the panel
Main.panel._centerBox.insert_child_at_index(panelButton, 2);
}

function disable () {
// Remove the added button from panel
Main.panel._centerBox.remove_child(panelButton);
}