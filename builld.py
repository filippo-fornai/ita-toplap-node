#!/usr/bin/env python3
"""
build_docs.py
-------------
Automate Nuxt static build → docs folder → commit & push (Windows-friendly).

Prerequisites
-------------
* Node/npm + npx on PATH
* Git repo already initialised; remote called "origin" set up
* Run from the root of the repository:  python build_docs.py
"""

from pathlib import Path
import subprocess
import shutil
import sys

ROOT        = Path(__file__).resolve().parent
DOCS_DIR    = ROOT / "docs"
PUBLIC_DIR  = ROOT / ".output" / "public"

# ---------- helpers ---------------------------------------------------------
def run(cmd: str) -> None:
    """Run a shell command, stop on failure (Windows-compatible)."""
    print(f"$ {cmd}")
    subprocess.run(cmd, shell=True, check=True)

def wipe_docs() -> None:
    if DOCS_DIR.exists():
        shutil.rmtree(DOCS_DIR)
    DOCS_DIR.mkdir(parents=True)
    print("✔ docs folder ready")

def build_site() -> None:
    run("npx nuxi generate")

def move_public() -> None:
    if not PUBLIC_DIR.exists():
        sys.exit("❌ .output/public not found – build must have failed.")
    for item in PUBLIC_DIR.iterdir():
        shutil.move(str(item), DOCS_DIR / item.name)
    print("✔ moved static output into docs/")

def git_commit_push() -> None:
    # Stage everything
    run("git add .")

    # Commit only if there are staged changes
    res = subprocess.run("git diff --cached --quiet", shell=True)
    if res.returncode == 0:
        print("ℹ Nothing new to commit.")
        return

    run('git commit -m "---new build---"')
    run("git push origin HEAD")
    print("✔ pushed new build to origin")

# ---------- main workflow ---------------------------------------------------
def main() -> None:
    try:
        wipe_docs()
        build_site()
        move_public()
        git_commit_push()
        print("\n🏁 Build + deploy finished.")
    except subprocess.CalledProcessError as err:
        sys.exit(f"❌ Command failed (exit {err.returncode}).")

if __name__ == "__main__":
    main()
