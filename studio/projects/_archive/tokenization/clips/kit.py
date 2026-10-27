import os, sys; sys.path.insert(0, os.environ["STUDIO_MANIM_LIB"])
from studio_style import *
from motion_kit import *      # shared primitives (breathe, chip_rows, phrase, slice_between, price_tag, receipt, xray, ...)
"""Tokenization-specific DATA only. Every reusable motion piece lives in studio/tools/manim_lib/motion_kit.py."""

TOKS = ["How", "many", "r", "'s", "are", "in", "strawberry", "?"]          # GPT-4o tokenizer, our test (S3)
IDS = [5299, 1991, 428, 885, 553, 306, 101830, 30]
ROWS = [(0, 4), (4, 6), (6, 8)]
CODES = [115, 116, 114, 97, 119, 98, 101, 114, 114, 121]                  # Unicode code points of "strawberry" (S10)
Q_PARTS = [("How", 0), ("many", 0.28), ("r", 0.28), ("'s", 0.04), ("are", 0.28), ("in", 0.28), ("strawberry", 0.28), ("?", 0.04)]

def token_rows(size=72, gap=0.45, buff=0.26):
    return chip_rows(TOKS, ROWS, size, gap, highlight=("strawberry",), buff=buff)

tag = hud_tag   # futuristic HUD tags (brand aesthetic)
