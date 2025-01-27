# Système de Gestion des Ressources Humaines

Une application web moderne de gestion des ressources humaines construite avec React et Tailwind CSS. Cette application simplifie les opérations RH, notamment la gestion des employés, le suivi des congés, le recrutement, l'évaluation des performances et le traitement de la paie.

## 🚀 Fonctionnalités

- **Gestion des Employés**
  - Annuaire complet des employés
  - Profils détaillés des employés
  - Suivi du statut des employés
  - Organisation par département

- **Gestion des Congés**
  - Workflow de soumission et d'approbation des demandes
  - Support de plusieurs types de congés
  - Visualisation du calendrier des congés
  - Suivi automatisé des soldes
  - Historique et rapports des congés
  - Intégration calendrier

- **Tableau de Bord**
  - Aperçu des indicateurs RH clés
  - Statistiques en temps réel
  - Graphiques de répartition des employés
  - Analyses par département

- **Système de Notifications**
  - Notifications en temps réel
  - Mises à jour et rappels importants
  - Alertes de demandes d'approbation

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- NPM (v6 ou supérieur)

## 🛠️ Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/votreidentifiant/hr-management-system.git
   ```

2. Naviguer vers le répertoire du projet :
   ```bash
   cd hr-management-system
   ```

3. Installer les dépendances :
   ```bash
   npm install
   ```

4. Démarrer le serveur de développement :
   ```bash
   npm run dev
   ```

## 🔧 Configuration

L'application utilise des variables d'environnement pour la configuration. Créez un fichier `.env` dans le répertoire racine avec les variables suivantes :

```env
VITE_API_URL=votre_url_api
VITE_APP_NAME=Système de Gestion RH
```

## 📚 Stack Technique

- **Framework Frontend :** React
- **Style :** Tailwind CSS
- **Composants UI :** Headless UI
- **Icônes :** Heroicons
- **Graphiques :** Recharts
- **Formulaires :** React Hook Form
- **Outil de Build :** Vite

## 🎯 Utilisation

### Gestion des Employés

```jsx
// Exemple : Ajout d'un nouvel employé
<EmployeeForm
  onSubmit={(data) => {
    // Traitement des données employé
    console.log(data);
  }}
/>
```

### Gestion des Congés

```jsx
// Exemple : Soumission d'une demande de congé
<NewLeaveRequest
  onSubmit={(leaveData) => {
    // Traitement de la demande de congé
    console.log(leaveData);
  }}
/>
```

## 🤝 Contribution

1. Forkez le dépôt
2. Créez votre branche de fonctionnalité (`git checkout -b feature/NouvelleFonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/NouvelleFonctionnalite`)
5. Ouvrez une Pull Request

## 📝 Style de Code

- Utilisation d'ESLint et Prettier pour le formatage du code
- Respect des bonnes pratiques React et des directives hooks
- Maintien de la modularité des composants
- Rédaction de messages de commit significatifs

## 🔑 Composants Principaux

- `Layout.jsx` : Mise en page principale de l'application
- `Dashboard.jsx` : Vue du tableau de bord
- `EmployeeList.jsx` : Annuaire des employés
- `LeaveManagement.jsx` : Système de gestion des congés
- `NotificationCenter.jsx` : Système de notifications

## 🎨 Personnalisation

### Thème Tailwind

L'application utilise un thème Tailwind personnalisé défini dans `tailwind.config.js` :

```js
theme: {
  extend: {
    colors: {
      uims: {
        red: '#D62828',
        black: '#1A1A1A',
      }
    }
  }
}
```

### Style des Composants

Les composants utilisent les classes Tailwind CSS pour le style. Des styles personnalisés peuvent être ajoutés dans `src/index.css`.

## 📦 Structure du Projet

```
hr-management-system/
├── src/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [Tailwind CSS](https://tailwindcss.com)
- [Headless UI](https://headlessui.dev)
- [Heroicons](https://heroicons.com)
- [Recharts](https://recharts.org)

## 📞 Support

Pour obtenir de l'aide, envoyez un email à support@hrms.com ou créez une issue dans le dépôt.
