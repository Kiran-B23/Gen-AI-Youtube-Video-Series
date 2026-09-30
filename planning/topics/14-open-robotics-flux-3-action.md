# 14. Open-weight robotics world action models (FLUX 3 Action + LeRobot)

> **Rank:** 14 of 18 (new addition, suggested priority ~#5) · **Difficulty:** High (hardware + big-GPU fine-tuning) · **YouTube upside:** High (physical demos + zero independent builds so far) · **Build time:** 1 weekend to assemble/calibrate SO-101 + 2–3 days recording episodes + 1–2 days LoRA training/eval (sim-only fallback: 2–3 days)

## 1. Overview
Black Forest Labs released **FLUX 3 Action** on Sept 23, 2026. It is a **7B open-weight "world action model" (WAM)** built on the FLUX 3 multimodal backbone. Inputs are camera frame(s), a robot state vector and a text instruction. Outputs are an **action chunk** (32 actions ≈ 2 s of motion) and, optionally, **decoded predicted video frames**. The control loop is predict → execute a fixed number of steps → observe fresh images → replan, which is how it recovers when a cube gets dropped. On NVIDIA's **RoboLab-120** simulation leaderboard it ranks **#1 at 42.9% (515/1200)**, ahead of HiDream-O1-Embodied (39.9%), OASIS WAM (39.0%) and the **16B Cosmos3-Nano-Policy (36.8%)**. BFL's own model page quotes 42.2% for the guidance-distilled variant. There are three checkpoints: `flux-3-action-base`, `flux-3-action-so101` and `flux-3-action-droid` (Franka). **LeRobot** ships a `Flux3Policy` with LoRA task adaptation for SO-101 (the docs are on LeRobot *main*, not v0.6.1). BFL says its SO-101 demo policy "was adapted on about 200 teleoperated episodes". Other demos: a drone trained on 800 scripted Isaac Sim flights, and two games, GRUNT ("a Quake-style shooter") and VECTOR (an "Out Run-style road racer"). **Not Doom.** Community context: Perceptron Mk1.5, a multimodal perception/embodied model, was released Sept 25 (per the digitalapplied tracker). **Key caveats:** the weights are under the **FLUX Kommunity License v1.0**, which MarkTechPost calls non-commercial (the training code is Apache-2.0). Inference needs a big GPU: MarkTechPost cites 32 GB BF16 / 24 GB FP8 with the text encoder offloaded, and the leaderboard lists 69 GB in its eval config. LeRobot's own page warns "this exact revision still needs GPU and robot validation." No independent end-to-end build video was found.

## 2. Why it attracts subscribers
- **Audience:** Makers and ML engineers who own or want an SO-101/SO-100 arm, LeRobot users who've trained ACT/SmolVLA and want the "next big model", and AI developers curious about world models who've never touched hardware.
- **Competition gap:** Existing FLUX 3 Action coverage is official (the Black Forest Labs / mimic videos) or news roundups (DigitalWeekly-Ai, ~70 views; "Release Notes", ~65 views). SO-101 content is strong but pre-FLUX: Trelis Research's ACT tutorial, Brogan M. Pratt's 2.5 h course, and Pius Lim's ACT vs SmolVLA. **No independent video fine-tunes FLUX 3 Action on a real arm, shows predicted vs real frames, or benchmarks it against ACT on the same episodes.**
- **Winning angle:** "I taught a ~$230 robot arm with a 7B world model, and it shows me what it *thinks* will happen before it moves." The predicted-frames visual is the hook no ACT video can match. The ACT baseline and the honest success-rate table make it credible.

## 3. Video ideas
| # | Title | Format | Length |
|---|---|---|---|
| 1 | I Taught a $230 Robot Arm With a 7B World Model (FLUX 3 Action + LeRobot) | Full build | 25–30 min |
| 2 | FLUX 3 Action vs ACT: Same 200 Episodes, Same Arm, Who Wins? | X vs Y benchmark | 15–18 min |
| 3 | This Robot Imagines the Future Before It Moves (Predicted vs Real Frames) | Explainer + demo | 10–12 min |
| 4 | No Robot? Train and Test FLUX 3 Action in Simulation for Under $20 | Full build (mini) | 12–15 min |
| 5 | What's a "World Action Model"? (60 s) | Explainer short | <60 s |

**Thumbnail / hook:** A split frame. Left: a ghostly, AI-generated "predicted" image of the gripper grabbing a cube. Right: the real arm doing it. Text: "It saw the future." A "$230" price tag hangs on the arm. **Hook (first 15 s):** "This robot arm costs about as much as a pair of headphones. Before every move, the AI controlling it draws a picture of what it expects to happen, and then it tries to make that picture real. I recorded 200 demos, rented a GPU, and put it head-to-head with the model everyone else uses."

## 4. Project build plan
**Project:** *"I taught a $200 robot arm with a 7B world model."* (The SO-101 leader + follower BOM is ~$230 in the US, and a follower alone is ~$122. Say "~$230 (parts, verify)".)
**Stack:** SO-101 leader + follower (Feetech STS3215 servos), 2 USB cameras (scene + wrist, matching the checkpoint's `observation.images.scene` / `observation.images.wrist`), LeRobot from source (main branch) with the `training,flux3,peft,diffusion` extras plus a torch-matched NATTEN wheel, `black-forest-labs/flux-3-action-so101` + a LoRA recipe (`examples/flux3/lora.json`), a rented H100/H200-class GPU for training/inference, `black-forest-labs/flux-action` for predicted-frame decoding, LeRobot ACT for the baseline, and LeRobot sim envs (LIBERO / gym-aloha) or Isaac Sim for the no-hardware fallback.
**Steps:**
1. **Build and calibrate:** assemble the SO-101 (or buy a kit), run `lerobot-find-port`, `lerobot-setup-motors`, and `lerobot-calibrate` for the follower and leader. Mount the scene camera and the wrist camera.
2. **Teleop and record:** teleoperate one simple task (e.g. "put the blue cube in the bowl") and record **~200 episodes** as a LeRobot v3 dataset at **30 Hz**, with 6 action + 6 state channels (gripper last, raw values, consistent calibration). Vary cube position and lighting. Push to the Hub.
3. **Zero-shot check:** load `flux-3-action-so101` unadapted and run 10 trials to get a "before" number. Offload the Qwen text encoder to CPU (~8.3 GiB saved) if VRAM is tight.
4. **LoRA fine-tune on a rented GPU:** `python -m lerobot.scripts.lerobot_train --config_path=examples/flux3/lora.json --policy.path=black-forest-labs/flux-3-action-so101 --dataset.repo_id=YOU/so101_cube`. The default is effective batch 8, 10,000 microsteps, EMA on, and the last 20% of episodes held out. Log GPU-hours and $.
5. **Evaluate both raw and EMA checkpoints** with the same rollout protocol (LeRobot notes EMA results on SO-101 are "mixed").
6. **Predicted vs real frames:** LeRobot returns *actions only*, so use the standalone `flux-action` repo to decode the model's predicted frames for a held-out episode and render them side by side with the real camera frames. Add a simple per-frame similarity score.
7. **ACT baseline:** train LeRobot ACT on the *same* 200 episodes on the same GPU and run the same rollouts.
8. **Score:** success rate over 20 trials per policy (in-distribution + 5 "novel" setups: new cube color, moved camera, reworded instruction), time to complete, training $, and inference latency per chunk.
9. **Safety:** enforce joint and velocity limits in the control loop and keep a physical e-stop within reach. The model card says outputs have "no inherent safety bounds."
10. **No-hardware fallback:** use a public SO-101 LeRobot community dataset for offline predicted-vs-real visualization, and a LeRobot sim env (LIBERO/gym-aloha) or Isaac Sim SO-101 for closed-loop ACT. State clearly that the FLUX SO-101 checkpoint targets the real arm's camera/state contract.

**Demo moments:** The first teleop episode with the leader arm mirrored by the follower. The ghostly predicted frames appearing a beat before the real arm moves. The arm recovering after you knock the cube away mid-grasp (replanning). FLUX vs ACT side by side on a "novel" setup. The GPU bill reveal.
**On-screen numbers:** Arm cost (BOM vs what you actually paid), episodes recorded and hours of teleop, training GPU-hours and $, success rate (FLUX zero-shot → FLUX LoRA raw/EMA → ACT) with n=20, inference ms per 32-action chunk and VRAM used, and predicted-frame similarity. For context, show RoboLab-120 at 42.9% vs Cosmos3-Nano-Policy's 36.8%, labeled "simulation benchmark".

## 5. Resources
### Official docs & specs
- [HF blog: FLUX 3 Action](https://huggingface.co/blog/black-forest-labs/flux-3-action) — Sept 23; 7B, 32 actions / 2 s, ~200 SO-101 teleop episodes, the drone (800 Isaac Sim flights) and GRUNT/VECTOR game demos (fetched)
- [BFL docs: FLUX 3 Action overview](https://docs.bfl.ai/flux_3/flux3_action_overview) — control loop, arms/games/drones, Kommunity License (fetched)
- [BFL: FLUX 3 Action model page](https://bfl.ai/models/flux-3-action) — 42.2% (guidance-distilled), 93.3% (28/30) in Positronic Robotics' real-robot eval, speed vs Pi0.5 (fetched)
- [HF: flux-3-action-base](https://huggingface.co/black-forest-labs/flux-3-action-base) — FLUX Kommunity License v1.0 (text encoder Apache-2.0), shared video VAE + Qwen3-VL-4B-Instruct, not gated (fetched)
- [HF: flux-3-action-so101](https://huggingface.co/black-forest-labs/flux-3-action-so101) — scene + wrist cameras, predicts 42 / executes 32 actions at 30 Hz, rank-32 LoRA, safety notes (fetched)
- [HF: flux-3-action-droid](https://huggingface.co/black-forest-labs/flux-3-action-droid) (loads)
- [LeRobot docs: FLUX 3 Action](https://huggingface.co/docs/lerobot/main/en/flux3) — install extras, NATTEN wheel, LoRA training commands, budgets, inference API, the "still needs GPU and robot validation" note (fetched; the [v0.6.1 URL](https://huggingface.co/docs/lerobot/flux3) says FLUX3 isn't in that release)
- [LeRobot docs: SO-101](https://huggingface.co/docs/lerobot/main/en/so101) — assembly, `lerobot-setup-motors`, `lerobot-calibrate` (fetched)
- [LeRobot docs: Imitation learning on real robots](https://huggingface.co/docs/lerobot/main/en/il_robots) · [ACT](https://huggingface.co/docs/lerobot/main/en/act) · [PEFT training](https://huggingface.co/docs/lerobot/main/en/peft_training) · [IL in sim](https://huggingface.co/docs/lerobot/main/en/il_sim) · [LIBERO](https://huggingface.co/docs/lerobot/main/en/libero) (all load)
- [NVIDIA RoboLab leaderboard](https://research.nvidia.com/labs/srl/projects/robolab/leaderboard.html) — FLUX 3 Action 515/1200 = 42.9%, 7B, 69 GB VRAM listed; Cosmos3-Nano-Policy 36.8% (fetched)
- [NATTEN wheels](https://whl.natten.org) — required by the video VAE; match your torch/CUDA (loads)

### Articles & blog posts
- [The Decoder: Black Forest Labs launches FLUX 3 Action](https://the-decoder.com/black-forest-labs-launches-flux-3-action-an-open-robotics-ai-model/) — "up to 3.95 times faster" than the previous leading open model (fetched)
- [VentureBeat: FLUX 3 Action tops the leaderboard at half the size](https://venturebeat.com/infrastructure/black-forest-labs-debuts-flux-3-action-an-open-weights-ai-robotics-model-that-tops-the-leaderboard-at-half-the-size-of-its-competition) — previous leader OASIS WAM at 39.0%; "commercial license terms not yet published" at announcement (fetched)
- [MarkTechPost: FLUX 3 Action tops RoboLab-120](https://www.marktechpost.com/2026/09/24/black-forest-labs-releases-flux-3-action-a-7b-open-weights-world-action-model-that-tops-robolab-120/) — 32 GB BF16 / 24 GB FP8 inference, Jetson support, speed table, "non-commercial" license (fetched)
- [Digital Applied: September 2026 release tracker](https://www.digitalapplied.com/blog/ai-model-releases-september-2026-tracker) — FLUX 3 Action (Sept 23) and Perceptron Mk1.5 (Sept 25, $0.15/$1.50 per M on OpenRouter) (fetched)

### GitHub repos & templates
- [black-forest-labs/flux-action](https://github.com/black-forest-labs/flux-action) — Apache-2.0 code; full fine-tuning, BF16/FP8r inference, SO-101 LoRA via LeRobot, custom embodiments; ~105 stars (fetched)
- [huggingface/lerobot](https://github.com/huggingface/lerobot) — install from source for FLUX3 support (loads; PyPI latest is 0.6.1)
- [TheRobotStudio/SO-ARM100](https://github.com/TheRobotStudio/SO-ARM100) — SO-101 BOM (**$229.88 US for leader+follower; $121.94 follower only**), 3D-print files, 9 kit vendors, ~7.6k stars (fetched)
- [huggingface/gym-aloha](https://github.com/huggingface/gym-aloha) — sim env for the ACT fallback (loads)

### YouTube videos (study / beat these)
- [FLUX 3 x mimic: The Next Generation of Video-Action Models](https://www.youtube.com/watch?v=xpn5jQzisWc) — Black Forest Labs · official video-action demo with mimic (predates the Action launch; re-uploaded by Alejandro Franceschi)
- [mimic x Black Forest Labs: Introducing FLUX-mimic](https://www.youtube.com/watch?v=oWIro-LOiGI) — mimic · partner-side demo
- [Flux 3 Action | Release Notes](https://www.youtube.com/watch?v=JgjGxmeFF-M) — Release Notes · short news recap
- [FLUX 3 Action Leads RoboLab — GLiNER2.5 and ThinkingCap](https://www.youtube.com/watch?v=oWOnaD0Ue-0) — DigitalWeekly-Ai · news roundup
- [Train an ACT Policy for the SO-101 Robot with LeRobot](https://www.youtube.com/watch?v=-tkEMLOLEwo) — Trelis Research · the ACT baseline workflow to copy (~20k views)
- [SO101 FULL BEGINNER COURSE: build & train AI robotic arms (2.5 hours)](https://www.youtube.com/watch?v=p6YIkDhPNyo) — Brogan M. Pratt · assembly → training
- [ACT vs SmolVLA: Testing on Hugging Face's LeRobot SO-101](https://www.youtube.com/watch?v=nWNIsJBwbvU) — Pius Lim · the "X vs Y on SO-101" format to beat
- [Running AI robotics experiments at home with LeRobot and SO-ARM100](https://www.youtube.com/watch?v=DeBLc2D6bvg) — Ilia · ~75k views; home-lab storytelling
- [From Zero to Teleop: LeRobot SO-101 + Isaac Sim Step-by-Step Guide](https://www.youtube.com/watch?v=mQ7O73dEDcU) — Lightwheel · for the no-hardware fallback
- [How We Trained a Robot to Fold Shirts With LeRobot](https://www.youtube.com/watch?v=dPe9v4gqbdg) — Hugging Face · official LeRobot case study
- Also: [Lerobot so101 - making dataset using teleoperation](https://www.youtube.com/watch?v=bJNcCPMUb9A) (RoboSketch), [LeRobot SO-ARM101 Robotic Arm - Assembly and Setup Guide](https://www.youtube.com/watch?v=70GuJf2jbYk) (WowRobo Robotics) — channels from search metadata only
- **Notable channels:** Black Forest Labs, Trelis Research, Brogan M. Pratt, Hugging Face, Lightwheel. (Channel names were verified through YouTube oEmbed or YouTube search-result metadata. No independent FLUX 3 Action fine-tune video was found as of Sept 29.)

### Tools & install
```bash
git clone https://github.com/huggingface/lerobot && cd lerobot     # FLUX3 lives on main, not PyPI 0.6.1
pip install -e ".[training,flux3,peft,diffusion,feetech]"           # flux3 extras + Feetech SDK for SO-101
uv pip install natten==0.21.6+torch2110cu128 --find-links https://whl.natten.org   # torch 2.11 / CUDA 12.8 (per LeRobot docs)
hf auth login
python -m lerobot.scripts.lerobot_train --config_path=examples/flux3/lora.json \
  --policy.path=black-forest-labs/flux-3-action-so101 --policy.device=cuda \
  --dataset.repo_id=YOUR_ORG/YOUR_SO101_DATASET --output_dir=outputs/so101_lora
git clone https://github.com/black-forest-labs/flux-action          # predicted-frame decoding + full fine-tunes
```

### Not found — search for:
- The GPU type and hours BFL used for the ~200-episode SO-101 adaptation — search `FLUX 3 Action SO-101 LoRA training time GPU hours`
- Minimum consumer-GPU VRAM that actually runs `flux-3-action-so101` in real time (sources say 24–69 GB depending on config) — search `FLUX 3 Action RTX 4090 inference`
- Full FLUX Kommunity License v1.0 text and commercial terms — search `FLUX Kommunity License v1.0 text commercial`
- Perceptron Mk1.5 primary announcement (only the tracker was found) — search `Perceptron Mk1.5 release`
- Any "Doom" demo (not found; BFL's games are GRUNT and VECTOR) — treat the seed claim as incorrect unless a source appears
- An independent FLUX 3 Action build video — search YouTube `FLUX 3 Action SO-101 fine-tune` again before filming

## 6. Caveats & fact-checks before filming
- **Hardware cost:** the SO-101 BOM is **$229.88 (US) for leader + follower** and $121.94 for a follower only, before 3D printing, cameras and kit markups. "$200 robot arm" is fair only for one arm, so use "~$230" on screen or show the receipt.
- **GPU reality:** this is not a laptop model. Inference needs ~24–32 GB (MarkTechPost, H200 figures), and the leaderboard lists 69 GB VRAM. The text encoder can go to CPU (~8.3 GiB). Budget for renting an H100/H200 and show the bill.
- **Predicted frames:** LeRobot's `Flux3Policy` returns **actions only** at inference. Predicted frames come from the standalone `flux-action` path ("optionally with 32 decoded frames"). Confirm this works for the SO-101 checkpoint before promising the visual.
- **Validation warning:** LeRobot's FLUX3 page says the current revision "still needs GPU and robot validation", and DROID PEFT is "experimental". Expect rough edges and pin a commit.
- **Benchmark framing:** RoboLab-120 is a **simulation** benchmark (42.9% = 515/1200). BFL's page shows 42.2% for the distilled variant, and its 93.3% (28/30) real-robot number is a Franka evaluation by Positronic Robotics, not SO-101. Don't imply your arm will hit either.
- **"~200 episodes"** is what BFL used for *its* demo clips across "a handful of related pick-and-place tasks." The LeRobot docs don't prescribe an episode count.
- **Data contract:** 30 Hz, 6+6 channels, gripper last, scene + wrist cameras (or a `--rename_map`), raw values, and the same calibration throughout. Mismatches silently wreck results.
- **License:** the FLUX Kommunity License v1.0 covers the weights (non-commercial per MarkTechPost; VentureBeat said commercial terms weren't published at launch), while the code is Apache-2.0. Fine for a YouTube demo; check it before any product use.
- **Seed corrections:** there's no Doom demo (the games are GRUNT and VECTOR). The seed video `xpn5jQzisWc` is the FLUX 3 × mimic video, not the Action launch. The `huggingface.co/docs/lerobot/flux3` URL resolves to v0.6.1, which lacks FLUX3; use `/main/en/flux3`.
- **Safety:** there are no built-in joint/velocity/force limits. Enforce them in software, keep an e-stop in reach, and never run it near people or pets.
- **Pin versions:** the LeRobot git commit (main), torch + CUDA + `natten==0.21.6+torch2110cu128` (or your match), the `flux-3-action-so101` HF revision (it pins its base revision), the `flux-action` commit, the GPU type, and your dataset repo revision. Show the filming date on screen.
