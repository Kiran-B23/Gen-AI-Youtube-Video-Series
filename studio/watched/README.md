# Listened seals

`<slug>.json` = the user watched and listened to this exact render on a phone: the sha1 of each MP4 in
`projects/<slug>/out/`. `deliver` (`tools/deliver_check.py`) refuses without a seal matching the MP4 it is about to copy.

Written only by the user: the "Listened on a phone with sound" tick on the studio app's Review page, or
`python tools/review.py <slug> --listened` in a terminal. Agent sessions cannot write this folder (sandbox), so an agent
can tick "Watched end to end" (it read every sheet) but can never deliver on its own.
