export default `(module Diode_SMD:D_SOD-123 (layer B.Cu) (tedit 561B6A12) (tstamp <%= data.key.id.toString(16) %>1)
    (at
    <%= data.x + 3.1 %>
    <%= data.y + 1 %>
    <%= data.rotation %>)
    (descr SOD-123)
    (tags SOD-123)
    (path <%= data.kicadReference(data.key.id + "0") %>)
    (attr smd)
    (fp_text reference D<%= data.key.id %> (at 0 2 <%= data.rotation %>) (layer B.SilkS)
      (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
    )
    (fp_text value D (at 0 -2.1 <%= data.rotation %>) (layer B.Fab)
      (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
    )
    (fp_line (start -2.25 1) (end 1.65 1) (layer B.SilkS) (width 0.12))
    (fp_line (start -2.25 -1) (end 1.65 -1) (layer B.SilkS) (width 0.12))
    (fp_line (start -2.35 1.15) (end -2.35 -1.15) (layer B.CrtYd) (width 0.05))
    (fp_line (start 2.35 -1.15) (end -2.35 -1.15) (layer B.CrtYd) (width 0.05))
    (fp_line (start 2.35 1.15) (end 2.35 -1.15) (layer B.CrtYd) (width 0.05))
    (fp_line (start -2.35 1.15) (end 2.35 1.15) (layer B.CrtYd) (width 0.05))
    (fp_line (start -1.4 0.9) (end 1.4 0.9) (layer B.Fab) (width 0.1))
    (fp_line (start 1.4 0.9) (end 1.4 -0.9) (layer B.Fab) (width 0.1))
    (fp_line (start 1.4 -0.9) (end -1.4 -0.9) (layer B.Fab) (width 0.1))
    (fp_line (start -1.4 -0.9) (end -1.4 0.9) (layer B.Fab) (width 0.1))
    (fp_line (start -0.75 0) (end -0.35 0) (layer B.Fab) (width 0.1))
    (fp_line (start -0.35 0) (end -0.35 0.55) (layer B.Fab) (width 0.1))
    (fp_line (start -0.35 0) (end -0.35 -0.55) (layer B.Fab) (width 0.1))
    (fp_line (start -0.35 0) (end 0.25 0.4) (layer B.Fab) (width 0.1))
    (fp_line (start 0.25 0.4) (end 0.25 -0.4) (layer B.Fab) (width 0.1))
    (fp_line (start 0.25 -0.4) (end -0.35 0) (layer B.Fab) (width 0.1))
    (fp_line (start 0.25 0) (end 0.75 0) (layer B.Fab) (width 0.1))
    (fp_line (start -2.25 1) (end -2.25 -1) (layer B.SilkS) (width 0.12))
    (fp_text user %R (at 0 2 270) (layer B.Fab)
      (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
    )
    (pad 2 smd rect (at 1.65 0 <%= data.rotation %>) (size 0.9 1.2) (layers B.Cu B.Paste B.Mask)
      <%- data.netForPad(2) %>)
    (pad 1 smd rect (at -1.65 0 <%= data.rotation %>) (size 0.9 1.2) (layers B.Cu B.Paste B.Mask)
      <%- data.netForPad(1) %>)
    (model \${KISYS3DMOD}/Diode_SMD.3dshapes/D_SOD-123.wrl
      (at (xyz 0 0 0))
      (scale (xyz 1 1 1))
      (rotate (xyz 0 0 0))
    )
  )

`;
