export default `
<%
const x = data.x;
const y = data.y;
%>$Comp
L MX_Alps_Hybrid:MX-NoLED K<%= data.key.id %>
U 1 1 <%= data.key.id %>1
P <%= x %> <%= y %>
F 0 "K<%= data.key.id %>" H <%= x %> <%= y + 200 %> 60  0000 C CNN
F 1 "<%= data.key.size.w %>U" H <%= x %> <%= y - 100 %> 60  0001 C CNN
F 2 "<%= data.key.library %>:<%= data.key.footprint %>" H <%= x %> <%= y %> 60  0001 C CNN
F 3 "" H <%= x %> <%= y %> 60  0000 C CNN
F 4 "<%= data.key.matrixPos %>" H <%= x %> <%= y %> 40  0000 C CNN "Matrix Position (do not modify)"
	1    <%= x %> <%= y %>
	1    0    0    -1
$EndComp
Wire Wire Line
    <%= x + 150 %> <%= y - 50 %> <%= x + 400 %> <%= y - 50 %>
<%= data.wires %>`;
