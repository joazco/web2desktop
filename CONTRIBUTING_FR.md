# Contribuer à web2desktop

Merci de votre intérêt pour **web2desktop** ❤️  
Toutes les contributions sont les bienvenues : signalement de bugs, propositions de fonctionnalités, amélioration de la documentation ou code.

Ce projet est encore en **développement précoce**, les retours et idées sont donc particulièrement appréciés.

---

## 🧭 Philosophie du projet

web2desktop a pour objectif d’être :

- simple
- transparent
- sécurisé par défaut
- agnostique vis-à-vis des frameworks

Merci de garder ces principes en tête lors de vos contributions.

---

## 🐞 Signaler un bug

Si vous rencontrez un bug :

1. Vérifiez qu’il n’a pas déjà été signalé.
2. Ouvrez une issue en précisant :
   - votre système d’exploitation (Windows / macOS / Linux)
   - la version de Node.js
   - la version d’Electron (si pertinent)
   - les étapes pour reproduire le problème
   - le comportement attendu et le comportement observé

Des rapports clairs facilitent énormément la résolution 🙏

---

## 💡 Proposer une fonctionnalité

Les propositions de fonctionnalités sont bienvenues.

Lors de l’ouverture d’une issue, merci d’expliquer :

- le problème que vous cherchez à résoudre
- en quoi cela correspond au périmètre de web2desktop
- un cas d’usage simple et concret

Évitez dans un premier temps les solutions trop complexes : la simplicité est une priorité.

---

## 🛠 Mise en place de l’environnement de développement

### Prérequis

- Node.js (version 24.12.0 LTS recommandée)
- npm
- macOS, Windows ou Linux

### Installation

```bash
npm install
```

### Mode développement

```bash
npm run dev:demo
```

Cette commande lance :

- TypeScript en mode watch
- Electron avec rechargement automatique

---

## 🔀 Pull requests

Pour proposer une pull request :

1. Forkez le dépôt
2. Créez une branche à partir de `main`
3. Implémentez vos modifications
4. Vérifiez que le projet se build et fonctionne correctement
5. Ouvrez une pull request avec une description claire

Merci de :

- garder des PRs ciblées et de taille raisonnable
- expliquer **pourquoi** la modification est nécessaire
- lier les issues concernées si applicable

---

## 🧹 Style de code

- Respectez la structure existante du projet
- Privilégiez la lisibilité à l’ingéniosité
- Évitez les dépendances inutiles
- Essayez de préserver la stabilité des APIs publiques

---

## 🔐 Sécurité

Si vous découvrez un problème de sécurité, **n’ouvrez pas d’issue publique**.  
Merci de contacter directement le mainteneur du projet.

---

## 📜 Licence

En contribuant à web2desktop, vous acceptez que vos contributions soient publiées sous licence **MIT**.

---

Merci de contribuer à l’amélioration de web2desktop 🚀
