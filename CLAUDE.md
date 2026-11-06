# Site clubim.fr — consignes de mise à jour

Site statique de l'agence CLUBIM (Lille), publié par GitHub Pages depuis la branche `main` de ce dépôt.
Le domaine clubim.fr pointe ici (fichier `CNAME`). Chaque push sur `main` est en ligne en 1 à 2 minutes.

## Où sont les biens

Tous les biens affichés sont dans `js/data.js`, tableau `LISTINGS`. Une entrée par bien :

- `id` : identifiant court en minuscules avec tirets (ex. `studio-41-mons-en-baroeul`), réutilisé pour le dossier photos.
- `titre`, `type` (Appartement, Maison, Immeuble, Bureaux, Local commercial, Parking), `transaction` (`location` ou `achat`), `ville` (ex. « Lille, Gambetta »).
- `prix` : loyer charges comprises par mois (location) ou prix honoraires inclus (vente), en nombre.
- `surface` (m², nombre ; à omettre si inconnue), `pieces`, `chambres` (facultatifs), `dpe` / `ges` (lettres ; à omettre pour un local non soumis).
- `photos` : chemins `assets/photos/<id>/1.jpg`, `2.jpg`… (1600 px max, JPEG qualité ~82). La 1re photo est la vignette. Sans photo, le site dessine une façade (`art`).
- `description` (paragraphes séparés par `\n\n`), `atouts` (4 à 5 puces courtes), `mentions` (loyer HC + charges, dépôt de garantie, honoraires, encadrement des loyers si zone concernée, DPE, Géorisques).

## Règles de contenu (Maxime)

- Uniquement la marque CLUBIM ; ne jamais mentionner le Cabinet ICE.
- Aucun tiret long « — » ni « – » dans les textes : virgule, deux-points ou point.
- Aucun chiffre inventé : prix, surfaces, charges, honoraires viennent du Socle agence ou de l'annonce.
- Vraies photos du bien uniquement, jamais d'image générée réaliste.
- Ne pas afficher un bien dont la fiche du Socle porte une alerte bloquante (diagnostics, surface, interdiction de location) sans accord de Maxime.
- La garantie Visale n'est jamais présentée en complément d'un garant physique.

## Ajouter / retirer un bien

1. Bien qui passe « disponible » (ou mis en vente) : ajouter l'entrée dans `LISTINGS` (en tête pour une vente, après les ventes pour une location) et ses photos dans `assets/photos/<id>/`.
2. Bien loué ou vendu : retirer l'entrée de `LISTINGS` et supprimer son dossier photos.
3. Vérifier la syntaxe : `node --check js/data.js`.
4. Commit en français (« Ajout : studio 30 m² Mons » / « Retrait : local 27 m² Roubaix, loué ») puis push sur `main`.

## Pages

index, annonces, bien (fiche, `bien.html?id=<id>`), tarifs, estimation, contact, dossier-locataire, a-propos, recrutement, mentions-legales.
Les actualités sont volontairement vides (`ARTICLES = []`) tant qu'elles ne sont pas réécrites avec de vrais sujets.

## Cache des navigateurs

Les pages appellent `css/style.css?v=AAAAMMJJx` et `js/*.js?v=AAAAMMJJx`. Après toute modification du CSS ou d'un JS, changer ce numéro dans toutes les pages (même valeur partout), sinon les téléphones gardent l'ancienne version en mémoire.
