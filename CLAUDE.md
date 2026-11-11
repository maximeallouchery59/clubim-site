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
4. **Régénérer les fiches statiques** : `node tools/generer-fiches.js`. Ce script crée une page `bien-<id>.html` par bien (titre, description, balises de partage, données structurées Google `RealEstateListing`, contenu lisible sans JavaScript), supprime celles des biens retirés et met à jour `sitemap.xml`. Ne jamais modifier ces pages à la main : modifier `js/data.js` (ou le gabarit `bien.html`) puis relancer le script.
5. Commit en français (« Ajout : studio 30 m² Mons » / « Retrait : local 27 m² Roubaix, loué ») puis push sur `main`.

## Pages

index, annonces, fiches des biens (`bien-<id>.html`, générées ; l'ancienne adresse `bien.html?id=<id>` renvoie vers la fiche et n'est pas indexée), tarifs, estimation, contact, dossier-locataire, a-propos, recrutement, actualites, mentions-legales.

## Actualités (« le journal »)

- Hub : `actualites.html` (grille de tuiles `.j-tile`, une tuile par article avec sa mini-illustration d'objet). Articles : une page statique par article à la racine, `actu-<sujet>.html`, styles dans `css/journal.css`, interactions (compte à rebours, calculatrice, quiz) dans `js/journal.js`.
- Principe validé par Maxime le 10/11/2026 : chaque article prend la forme d'un **objet du quotidien détourné** (compte à rebours, bulletin météo, récap de série, calculatrice, ticket de caisse, quiz…), ton léger, faits réels. Ne pas réutiliser le même objet deux mois de suite.
- Chaque article : chapô, objet mis en scène (`.j-stage`), 2 ou 3 intertitres courts, un encadré « Notre conseil » (`.j-aside`), les **sources** (`.j-sources`, liens vers les articles d'origine) et les boutons de fin. Aucun chiffre sans source. Pas de DPE comme sujet, pas de gestion locative.
- En publiant ou retirant un article : mettre à jour la tuile du hub, la date d'édition et le nombre d'articles, le quiz s'il cite l'article, et `sitemap.xml`. Un article périmé (ex. compte à rebours passé) est mis à jour ou retiré.
- Le gabarit des pages (en-tête, pied, balises de partage) est celui des autres pages : copier une page existante.
- Les anciennes actualités `ARTICLES` de `js/data.js` restent vides et inutilisées.

## Cache des navigateurs

Les pages appellent `css/style.css?v=AAAAMMJJx` et `js/*.js?v=AAAAMMJJx`. Après toute modification du CSS ou d'un JS, changer ce numéro dans toutes les pages (même valeur partout), sinon les téléphones gardent l'ancienne version en mémoire.

## Référencement (SEO)

- Chaque page a un `<title>` de 65 caractères au plus, une `meta description` de 150 à 160 caractères, une balise `canonical` et un seul `<h1>`.
- Données structurées : `RealEstateAgent` (accueil, contact), `RealEstateListing` + fil d'Ariane (fiches des biens, générées), `NewsArticle` (articles d'actualité : mettre à jour `dateModified` quand un article change).
- `sitemap.xml` liste toutes les pages publiques ; le script des fiches gère les lignes `bien-…`. Ajouter à la main les nouvelles pages et articles.
- Les liens internes vers un bien pointent vers `bien-<id>.html`.
