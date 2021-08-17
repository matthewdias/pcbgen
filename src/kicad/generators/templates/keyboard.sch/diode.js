export default `
<%
const x = data.x;
const y = data.y;
%>
$Comp
L Device:D_Small D<%= data.key.id %>
U 1 1 <%= data.key.id %>0
P <%= x - 50 %> <%= y + 300 %>
F 0 "D<%= data.key.id %>" V <%= x + 20 %> <%= y + 200 %> 50  0000 R CNN
F 1 "D" V <%= x - 70 %> <%= y + 200 %> 50  0000 R CNN
F 2 "Diode_SMD:D_SOD-123" H <%= x - 350 %> <%= y + 250 %> 50  0001 C CNN
F 3 "~" H <%= x - 350 %> <%= y + 250 %> 50  0001 C CNN
1    <%= x - 350 %>  <%= y + 250 %>
	0    -1   -1   0
$EndComp
Wire Wire Line
	<%= x - 50 %> <%= y + 150 %> <%= x - 50 %> <%= y + 200 %>
Connection ~ <%= x - 50 %> <%= y + 400 %>`;
