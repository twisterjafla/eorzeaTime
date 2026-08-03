/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

import GObject from 'gi://GObject';
import St from 'gi://St';
import Clutter from "gi://Clutter";
import GLib from 'gi://GLib';


import {Extension, gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';



export default class IndicatorExampleExtension extends Extension {

    getTime(){
        var localEpoch = (new Date()).getTime();
        var epoch = localEpoch * 20.571428571428573;
        var minutes = parseInt((epoch / (1000 * 60)) % 60);
        var hours = parseInt((epoch / (1000 * 60 * 60)) % 24);
        var seconds = parseInt(Math.round(((epoch / (1000)) % 60) / 10) * 10);
        return String(hours).padStart(2, '0')+ ":" + String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');
    }

    enable() {





        this.label = new St.Label({
            text: this.getTime(),
            x_align: Clutter.ActorAlign.CENTER,
            y_align: Clutter.ActorAlign.CENTER,
            translation_y: -1,
            translation_x: -30
        })
        this._indicator = new PanelMenu.Button();
        this._indicator.add_child(this.label);
        Main.panel.addToStatusArea(this.uuid, this._indicator, 1, "center");
        this.count =0;

        this.timeout = GLib.timeout_add(
            GLib.PRIORITY_DEFAULT,
            500,
            () => {

                
                this.label.set_text(this.getTime());

                return GLib.SOURCE_CONTINUE;
            }
        );
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}
