export default {
    start: `
$Comp
L power:GND #PWR0119
U 1 1 60E64D3A
P <%= x %> 7500
F 0 "#PWR0119" H <%= x %> 7250 50  0001 C CNN
F 1 "GND" H <%= x %> 7327 50  0000 C CNN
F 2 "" H <%= x %> 7500 50  0001 C CNN
F 3 "" H <%= x %> 7500 50  0001 C CNN
	1    <%= x %> 7500
	1    0    0    -1  
$EndComp
Text GLabel <%= x + 300 %> 7200 0    50   Input ~ 0
RGB
$Comp
L power:+5V #PWR0118
U 1 1 60E63BE6
P <%= x %> 6900
F 0 "#PWR0118" H <%= x %> 6750 50  0001 C CNN
F 1 "+5V" H <%= x %> 7073 50  0000 C CNN
F 2 "" H <%= x %> 6900 50  0001 C CNN
F 3 "" H <%= x %> 6900 50  0001 C CNN
	1    <%= x %> 6900
	1    0    0    -1  
$EndComp`,

    rgb: `
Wire Wire Line
	<%= x + (index * 600) %> 7500 <%= (x + (index * 600)) + 600 %> 7500
Wire Wire Line
	<%= x + (index * 600) %> 6900 <%= (x + (index * 600)) + 600 %> 6900
Connection ~ <%= x + (index * 600) %> 7500
Connection ~ <%= x + (index * 600) %> 6900
$Comp
L LED:WS2812B RGB<%= index %>
U 1 1 <%= index %>2812
P <%= (x + (index * 600)) + 600 %> 7200
F 0 "RGB<%= index %>" H <%= (x + (index * 600)) + 650 %> 7450 50  0000 L CNN
F 1 "WS2812B" H <%= (x + (index * 600)) + 650 %> 6950 50  0000 L CNN
F 2 "LED_SMD:LED_WS2812B_PLCC4_5.0x5.0mm_P3.2mm" H <%= (x + (index * 600)) + 650 %> 6900 50  0001 L TNN
F 3 "https://cdn-shop.adafruit.com/datasheets/WS2812B.pdf" H <%= (x + (index * 600)) + 700 %> 6825 50  0001 L TNN
	1    <%= (x + (index * 600)) + 600 %> 7200
	1    0    0    -1  
$EndComp`
}
