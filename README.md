<p align="center">
  <img src="./public/screenshot/all-devices.png" alt="Aperçu multi-devices Dish Duty" style="max-width:100%; border-radius: 16px;" />
</p>

<h1 align="center">🍽️ Dish Duty</h1>
<p align="center">
  <img src="./public/dish-duty-logo.png" alt="Dish Duty Logo" width="120" />
</p>
<p align="center">
  <b>L'application familiale ultime pour ne plus jamais se disputer la vaisselle !</b><br>
  <a href="https://dishduty.one" target="_blank">Voir le site en ligne 🚀</a>
</p>

---

## ✨ Présentation

**Dish Duty** révolutionne la gestion de la vaisselle à la maison !

Fini les « C'est à qui ? », les oublis et les tensions : l'application attribue chaque jour la corvée à la bonne personne, envoie des notifications push, et motive toute la famille avec des messages positifs.

Pensée pour être ultra fluide, moderne et agréable, Dish Duty s'adapte à tous les écrans (mobile, tablette, desktop) et rend la corvée… presque fun !


---

## 🖥️ Aperçu multi-supports

<p align="center">
  <img src="./public/screenshot/all-devices.png" alt="Aperçu multi-devices" style="max-width:100%; border-radius: 16px;" />
</p>

---

## 📱 Vue quotidienne

<p align="center">
  <img src="./public/screenshot/daily-view.png" alt="Vue quotidienne" width="350" style="border-radius: 12px; box-shadow: 0 4px 24px #0001;" />
</p>

- Affichage du responsable du jour
- Message motivant aléatoire
- Design coloré et dynamique

---

## 📅 Vue hebdomadaire

<p align="center">
  <img src="./public/screenshot/weekly-view.png" alt="Vue hebdomadaire" width="350" style="border-radius: 12px; box-shadow: 0 4px 24px #0001;" />
</p>

- Planning de la semaine
- Attribution claire pour chaque jour
- Légende colorée pour chaque membre

---

## 🚀 Fonctionnalités principales

- **Notifications push** (Web Push API)
- **Responsive** : mobile, tablette, desktop
- **Planning automatique** (rotation personnalisable)
- **Design moderne** (animations, skeletons de chargement)
- **Mode admin** pour gérer les abonnements
- **Expérience utilisateur premium** (transitions, feedbacks, accessibilité)

---

## 🛠️ Stack technique

- **Next.js 15**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **MongoDB** (stockage des abonnements)
- **Web Push** (notifications)
- **React Hot Toast** (feedback utilisateur)
- **Radix UI** (composants accessibles)

---

## 📸 Galerie de screenshots

<p align="center">
  <img src="./public/screenshot/desktop.png" alt="Vue desktop" width="400" style="border-radius: 12px; margin: 8px;" />
  <img src="./public/screenshot/laptop.png" alt="Vue laptop" width="400" style="border-radius: 12px; margin: 8px;" />
  <img src="./public/screenshot/tablet.png" alt="Vue tablette" width="300" style="border-radius: 12px; margin: 8px;" />
</p>

---

## 🔔 Notifications Push

- Système d'abonnement simple (1 clic)
- Notifications automatiques pour rappeler la corvée
- Gestion des abonnements en base MongoDB

---

## 🧑‍💻 Installation & développement

```bash
git clone https://github.com/ton-utilisateur/dish-duty-app.git
cd dish-duty-app

# Installe les dépendances
(p)npm install

# Copie le .env.example et configure tes clés
cp .env.example .env.local

# Génère les clés VAPID pour les notifications push
npx web-push generate-vapid-keys

# Lance le serveur de dev
(p)npm run dev
```

---

## ⚙️ Configuration

**Variables d'environnement principales :**

- `MONGO_URI` : URL de connexion MongoDB
- `NEXT_PUBLIC_VAPID_PUBLIC_KEY` : Clé publique VAPID (Web Push)
- `VAPID_PRIVATE_KEY` : Clé privée VAPID
- `ADMIN_PASSWORD` : Mot de passe admin pour la gestion des abonnements

---

## 🏗️ Structure du projet

```
/app
  page.tsx                # Page principale (point d'entrée)
  layout.tsx              # Layout global de l'app
  /api/                   # Endpoints API (push, admin, etc.)
  /admin/                 # Pages et outils d'administration

/components
  desktop-layout.tsx      # Layout desktop
  mobile-layout.tsx       # Layout mobile
  daily-view.tsx          # Vue quotidienne
  weekly-view.tsx         # Vue hebdomadaire
  push-notifications.tsx  # Gestion des notifications push
  theme-provider.tsx      # Gestion du thème (dark/light)
  /ui/                    # Composants UI réutilisables (skeleton, button, etc.)

/hooks
  use-mobile.tsx          # Hook pour détecter le mobile
  use-toast.ts            # Hook pour les toasts/notifications

/lib
  utils.ts                # Fonctions utilitaires (planning, formatage, etc.)
  notifications.ts        # Logique notifications push
  /models/                # Modèles Mongoose (MongoDB)

/public
  /screenshot/            # Screenshots pour la doc et le marketing
    all-devices.png
    daily-view.png
    weekly-view.png
    ...
  dish-duty-logo.png      # Logo principal de l'app
  sw.js                   # Service Worker pour les notifications push
  favicon.ico             # Favicon
  site.webmanifest        # Manifest PWA
```

---

## 👨‍👩‍👧‍👦 Pour qui ?

- Familles, colocations, couples, amis…
- Toute personne qui veut une répartition équitable et fun des tâches !

---

## 💡 Personnalisation

- Modifie le planning dans `lib/utils.ts` pour adapter les prénoms et la rotation.
- Change les phrases motivantes dans `components/daily-view.tsx`.
- Ajoute tes propres couleurs ou avatars dans le code.

---

## 🛡️ Sécurité & RGPD

- Les abonnements push sont anonymes et stockés en base.
- Pas de tracking, pas de pub, juste la vaisselle !

---

## 📬 Contact & support

- [Ouvre une issue sur GitHub](https://github.com/Morg9864/dish-duty-app/issues)
- Contacte-moi sur [morgan.phemba@gmail.com](mailto:morgan.phemba@gmail.com)

## Licence

Ce projet est sous licence NonCommercial Software License.

Copyright (c) 2024 Morgan Phemba

Permission est accordée, gratuitement, à toute personne obtenant une copie de ce logiciel et des fichiers de documentation associés (le « Logiciel »), d’utiliser, copier et modifier le Logiciel **uniquement à des fins personnelles et non commerciales**, sous réserve des conditions suivantes :

1. **Interdiction de toute utilisation commerciale**  
   Le Logiciel, en tout ou en partie, **ne doit pas** être utilisé, distribué, sous-licencié ou vendu pour un quelconque avantage commercial, une compensation monétaire ou de toute autre manière générant un revenu direct ou indirect. Toute exploitation dépassant l’expérimentation privée, l’apprentissage ou la personnalisation à titre personnel est strictement interdite.

2. **Attribution du code source**  
   Si tu distribues des versions modifiées du Logiciel (toujours à des fins **non commerciales**), tu dois conserver cette notice de copyright et le texte de licence dans toutes les copies ou parties substantielles du Logiciel.

3. **Absence de garantie**  
   LE LOGICIEL EST FOURNI « TEL QUEL », SANS AUCUNE GARANTIE EXPLICITE OU IMPLICITE, Y COMPRIS MAIS SANS S’Y LIMITER AUX GARANTIES DE QUALITÉ MARCHANDE, D’ADÉQUATION À UN USAGE PARTICULIER ET D’ABSENCE DE CONTREFAÇON. EN AUCUN CAS, L’AUTEUR OU LE TITULAIRE DU DROIT D’AUTEUR NE POURRA ÊTRE TENU RESPONSABLE DE TOUTE RÉCLAMATION, DOMMAGE OU AUTRE RESPONSABILITÉ, DANS UNE ACTION CONTRACTUELLE, DÉLICTUELLE OU AUTRE, PROVENANT DE, HORS DE OU EN LIEN AVEC LE LOGICIEL OU SON UTILISATION.

4. **Résiliation**  
   Toute tentative d’utilisation ou de distribution du Logiciel en violation de cette licence (y compris toute utilisation commerciale) entraînera la résiliation automatique de tes droits en vertu de cette licence. Dès lors, tu dois cesser toute utilisation et détruire toutes les copies en ta possession.


<p align="center">
  <img src="./public/dish-duty-logo.png" alt="Dish Duty Logo" width="80" />
  <br>
  <b>Dish Duty</b> — La vaisselle, sans prise de tête !
</p> 