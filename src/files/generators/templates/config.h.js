module.exports = `
/*
Copyright %current_year% %author%

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

#pragma once

#include "config_common.h"


/* USB Device descriptor parameter */
#define VENDOR_ID       0x%vendor_id%
#define PRODUCT_ID      0x%product_id%
#define DEVICE_VER      0x%device_ver%
#define MANUFACTURER    %manufacturer%
#define PRODUCT         %product%

/* key matrix size */
#define MATRIX_ROWS %rows%
#define MATRIX_COLS %cols%

/* key matrix pins */
#define MATRIX_ROW_PINS { %row_pins% }
#define MATRIX_COL_PINS { %col_pins% }
#define UNUSED_PINS

/* COL2ROW or ROW2COL */
#define DIODE_DIRECTION %diode_direction%

/* Set 0 if debouncing isn't needed */
#define DEBOUNCE 5

/* number of backlight levels */
%backlight_pin%
#ifdef BACKLIGHT_PIN
#define BACKLIGHT_LEVELS %backlight_levels%
#endif

%rgb_pin%
#ifdef RGB_DI_PIN
#define RGBLED_NUM %num_rgb%
#define RGBLIGHT_ANIMATIONS
#endif

%led_num%
%led_caps%
%led_scroll%
%led_compose%
%led_kana%

/*
 * Feature disable options
 *  These options are also useful to firmware size reduction.
 */

/* disable debug print */
//#define NO_DEBUG

/* disable print */
//#define NO_PRINT

/* disable these deprecated features by default */
#define NO_ACTION_MACRO
#define NO_ACTION_FUNCTION
`;
