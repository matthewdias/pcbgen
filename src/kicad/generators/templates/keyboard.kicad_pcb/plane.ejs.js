export default `  (zone (net 0) (net_name <%= data.name %>) (layer <%= data.layer %>) (tstamp 0) (hatch edge 0.508)
    (connect_pads yes (clearance 0.25))
    (min_thickness 0.254)
    (fill yes (arc_segments 16) (thermal_gap 0.508) (thermal_bridge_width 0.508))
    (polygon
      (pts
        (xy <%= data.x %> <%= data.y %>) (xy <%= data.x %> <%= data.y1 %>) (xy <%= data.x1 %> <%= data.y1 %>) (xy <%= data.x1 %> <%= data.y %>)
      )
    )
    (filled_polygon
      (pts
        (xy <%= data.x + 1 %> <%= data.y + 1 %>) (xy <%= data.x + 1 %> <%= data.y1 - 1 %>) (xy <%= data.x1 - 1 %> <%= data.y1 - 1 %>) (xy <%= data.x1 - 1 %> <%= data.y + 1 %>)
      )
    )
  )
`;
