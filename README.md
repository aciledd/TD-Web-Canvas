# 🍍 Chasse Amazonienne 🍍

**Auteurs : Acile EL DADA & Saadeddine DOUGHANE**  
**L3 MIAGE — TP Jeu Canvas HTML5**

🎮 **Jeu hébergé : https://chasse-banane.vercel.app/**  
📁 **Repository GitHub : https://github.com/aciledd/TD-Web-Canvas**

---

## 🗒️ Description

Chasse Amazonienne est un jeu de clic sur navigateur développé en JavaScript vanilla avec HTML5 Canvas. Le joueur doit attraper des fruits qui tombent du ciel pour nourrir le singe, en évitant d'en rater trop. Le jeu propose 3 niveaux de difficulté croissante, un système de vies, des scores sauvegardés et une ambiance sonore et visuelle immersive sur le thème de la jungle sauvage.

---

## 🕹️ Comment y jouer

- **ESPACE ou Clic** — Démarrer / Confirmer
- **Clic** — Attraper les fruits qui tombent en les ciblant
- **ESC** — Accéder à la page des meilleurs scores
- En ratant 5 fruits, une vie s'enfuit
- 3 vies au total

### Points par fruit
| Fruit | Points |
|-------|--------|
| Banane jaune | 50 pts |
| Banane verte | 100 pts |
| Régime de bananes | 200 pts |
| Ananas | 500 pts |

---

## 🪜 Structure du projet

```
chasse-amazonienne/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── script.js       ← Boucle principale, états du jeu
│   ├── banana.js       ← Classe Banana (types, dessin, collision)
│   ├── particle.js     ← Classe Particle (effets visuels au clic)
│   └── handler.js      ← Écouteurs centralisés (clavier + souris)
└── assets/
    └── sounds/
```

---

## 💻 Bonnes pratiques respectées

### Architecture & Organisation
- **Séparation en modules ES6** : `Banana`, `Particle` et `handler` dans des fichiers distincts, importés via `import/export`
- **Pas de code "à plat"** : logique de jeu encapsulée dans des classes avec leurs propres méthodes `draw()`, `update()`, `containsPoint()`

### Canvas & Animation
- **`requestAnimationFrame()`** utilisé pour la boucle d'animation (pas de `setInterval`)
- **`ctx.save()` / `ctx.restore()`** systématiquement utilisés dans chaque fonction de dessin
- **`ctx.translate()` + `ctx.rotate()`** : les objets sont dessinés comme s'ils étaient en (0,0), puis positionnés par transformation géométrique, conformément aux exigences du MOOC

### Gestion des états
Le jeu est entièrement géré par un `gameState` avec les états suivants, chacun ayant sa propre fonction `draw` et `update` appelées 60 fois par seconde dans la boucle :

| État | Description |
|------|-------------|
| `MENU` | Écran d'accueil |
| `PLAYING` | Jeu en cours |
| `LEVEL_COMPLETE` | Fin de niveau |
| `VICTORY` | Victoire totale (niveau 3 terminé) |
| `GAME_OVER` | Plus de vies |
| `HI_SCORES` | Meilleurs scores |

### Écouteurs centralisés
Tous les inputs (clavier, souris) sont gérés dans `handler.js` via un objet `inputStates` partagé, initialisé une seule fois au démarrage.

### Hi-Scores
Sauvegarde des 5 meilleurs scores en `localStorage`, avec la date.

---

## 🎨 Design & Expérience utilisateur

Ce dont nous sommes fiers :

- **Thème jungle cohérent** du début à la fin : fond, couleurs, police Fredoka, singe décoratif, panier qui se remplit progressivement
- **Ambiance sonore** : son d'ambiance en boucle discret + effet sonore "pop" à chaque fruit attrapé
- **Effets visuels** : explosion de particules en étoile colorées à chaque clic réussi, propres à chaque type de fruit
- **Curseur personnalisé** : remplacé par une cible adaptée au gameplay
- **Panier progressif** : 5 états visuels (panier0 à panier4) qui se remplissent au fil des fruits attrapés
- **Design glassmorphism** moderne sur les menus et l'interface
- **Jeu hébergé** sur Vercel, accessible depuis n'importe quel navigateur

---

## 📈 Les 3 niveaux

| Niveau | Fruits à attraper | Intervalle spawn | Vitesse |
|--------|-------------------|------------------|---------|
| 1 | 15 | 1500ms | x1.0 |
| 2 | 20 | 1200ms | x1.3 |
| 3 | 25 | 1000ms | x1.6 |

---

## 🐛 Difficultés rencontrées & solutions

**Problème de vitesse au rejeu** : lors d'une nouvelle partie après avoir terminé les 3 niveaux, les fruits apparaissaient en rafale. La cause était `lastSpawnTime = 0` alors que `currentTime` (fourni par `requestAnimationFrame`) valait déjà plusieurs milliers de ms, la différence était donc immédiatement supérieure à l'intervalle de spawn. Solution : initialiser `lastSpawnTime = currentTime` au démarrage de chaque niveau.

**Chargement des images** : gestion asynchrone avec `Promise` pour s'assurer que toutes les images sont chargées avant le démarrage de la boucle d'animation, avec fallback si une image échoue.

**Autoplay audio bloqué** : les navigateurs modernes bloquent l'autoplay audio sans interaction préalable. Solution : démarrage du son de fond au premier clic de l'utilisateur via un écouteur `{ once: true }`.

---

## 🔧 Améliorations envisagées

- **Responsive / mobile** : le jeu n'est pas optimisé pour les petits écrans. Une adaptation du canvas et des contrôles tactiles serait nécessaire pour une expérience mobile.
- **Pause** : un bouton pause et/ou quitter pour plus de liberté durant le jeu
- **Plus de fruits** : d'autres types de fruits avec des comportements différents (trajectoires en zigzag, rebond, etc.)
- **Animations d'entrée** : transitions entre les écrans plus fluides
- **Difficulté adaptative** : ajuster la vitesse en temps réel selon les performances du joueur

---

## 🤖 Utilisation de l'IA (Claude - Anthropic)

L'IA a été utilisée pour les parties suivantes :

**Génération d'images :**
- Images du panier aux 5 états de remplissage (`panier0.png` à `panier4.png`) — générées par IA
- Image du singe décoratif (`singe-adosse.png`) — générée par IA

**Aide au développement :**
- Débogage du problème de vitesse de spawn au rejeu
- Mise en place du système de particules (classe `Particle`)
- Structure initiale du système de chargement asynchrone des assets
- Aide à la rédaction de ce README

Tout le code généré avec assistance IA a été relu, compris et intégré manuellement. Les choix de conception, l'architecture des états, le gameplay et le design sont le fruit de notre imagination.

---

## 🔗 Ressources externes

### Images (Flaticon)
Les icônes de fruits utilisées dans le panneau d'information sont issues de [Flaticon](https://www.flaticon.com) :
- Sophia tkx
- Park Jisun  
- max.icons

### Sons (Freesound.org)
- Son d'ambiance jungle : [freesound.org](https://freesound.org)
- Effet sonore "pop" : [freesound.org](https://freesound.org)

### Police
- [Fredoka](https://fonts.google.com/specimen/Fredoka) — Google Fonts

### Hébergement
- [Vercel](https://vercel.com) — déploiement continu depuis GitHub