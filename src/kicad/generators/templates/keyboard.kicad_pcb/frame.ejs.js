module.exports = `  (gr_line (start <%= data.x + data.radius %> <%= data.y %>) (end <%= data.x1 - data.radius %> <%= data.y %>) (layer Edge.Cuts) (width 0.2))
  (gr_line (start <%= data.x1 %> <%= data.y + data.radius %>) (end <%= data.x1 %> <%= data.y1 - data.radius %>) (layer Edge.Cuts) (width 0.2))
  (gr_line (start <%= data.x1 - data.radius %> <%= data.y1 %>) (end <%= data.x + data.radius %> <%= data.y1 %>) (layer Edge.Cuts) (width 0.2))
  (gr_line (start <%= data.x %> <%= data.y1 - data.radius %>) (end <%= data.x %> <%= data.y + data.radius %>) (layer Edge.Cuts) (width 0.2))
  (gr_arc (start <%= data.x + data.radius %> <%= data.y + data.radius %>) (end <%= data.x + data.radius %> <%= data.y %>) (angle -90) (layer Edge.Cuts) (width 0.2))
  (gr_arc (start <%= data.x1 - data.radius %> <%= data.y + data.radius %>) (end <%= data.x1 %> <%= data.y + data.radius %>) (angle -90) (layer Edge.Cuts) (width 0.2))
  (gr_arc (start <%= data.x1 - data.radius %> <%= data.y1 - data.radius %>) (end <%= data.x1 - data.radius %> <%= data.y1 %>) (angle -90) (layer Edge.Cuts) (width 0.2))
  (gr_arc (start <%= data.x + data.radius %> <%= data.y1 - data.radius %>) (end <%= data.x %> <%= data.y1 - data.radius %>) (angle -90) (layer Edge.Cuts) (width 0.2))
`;
