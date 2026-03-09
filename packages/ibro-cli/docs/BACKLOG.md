# ibro-cli — Backlog

This file tracks **concrete implementation tasks**.
It is intentionally low-level and execution-focused.

---

## 🧱 Core CLI

- [ ] Implement `ibro init`
- [ ] Implement `ibro add <module>`
- [ ] Implement `ibro list`
- [ ] Parse registry.json
- [ ] Download module payloads
- [ ] Copy files with overwrite rules
- [ ] Write `.ibro.lock`
- [ ] Validate target directory

---

## 📦 Module Handling

- [ ] Support multiple modules per project
- [ ] Validate module structure
- [ ] Detect missing or invalid modules
- [ ] Improve module metadata schema

---

## 🧠 Safety & Rules

- [ ] Enforce non-overwrite rules
- [ ] Warn on conflicts
- [ ] Detect partial installs
- [ ] Add rollback safety (later)

---

## 🧪 DX / Developer Experience

- [ ] Clear CLI help output
- [ ] Colored logs
- [ ] Better error messages
- [ ] Dry-run support
- [ ] Verbose mode

---

## 📚 Documentation

- [ ] Improve README
- [ ] Add CLI usage examples
- [ ] Document module format
- [ ] Explain governance philosophy

---

## 🧭 Future

- [ ] `ibro update`
- [ ] Module version pinning
- [ ] Preset system
- [ ] Plugin architecture (optional)
- [ ] Registry validation

---

## Guiding Rule

> If a feature reduces clarity, it does not belong in ibro-cli.
