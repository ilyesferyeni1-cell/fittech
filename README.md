# FitTech - Saudi Pro League Tracker

A comprehensive football analytics platform for tracking and analyzing Saudi Pro League teams, players, and match statistics. This full-stack application provides real-time insights, AI-powered player recommendations, and detailed performance metrics.

## 🎯 Project Overview

FitTech is a modern web application that combines data analytics, machine learning, and intuitive visualization to provide coaches, analysts, and football enthusiasts with actionable insights about the Saudi Pro League. The platform features a star schema data warehouse architecture for efficient data management and analysis.

## ✨ Features

### 1. **Team Rankings**
- View team standings based on performance metrics
- Track total goals and team statistics
- Real-time ranking updates

### 2. **Player Tracking**
- Comprehensive player database
- Position-based filtering (GK, DEF, MID, FWD)
- Player performance tracking across matches

### 3. **Best Players by Position**
- Top performers categorized by position
- Performance score calculations
- Filtered views for each playing position

### 4. **AI-Powered Recommendations**
- Intelligent player performance rankings
- AI-driven substitution suggestions
- Performance score predictions
- Interactive substitution dialog for team management

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- **Framework:** Angular 18.2
- **UI Library:** Angular Material
- **Styling:** SCSS with custom CSS variables
- **State Management:** RxJS Observables
- **HTTP Client:** Angular HttpClient

**Backend:**
- **Runtime:** Node.js
- **Framework:** Express.js 5.1
- **Data Processing:** CSV parser
- **CORS:** Enabled for cross-origin requests

**Data Processing:**
- **Language:** Python 3
- **Libraries:** Pandas
- **Data Format:** CSV files
- **Architecture:** Star Schema Data Warehouse

### Project Structure

```
fittech/
├── backend/                 # Node.js/Express API server
│   ├── app.js              # Main server file
│   ├── data/               # CSV data files
│   │   ├── dim_competition.csv
│   │   ├── dim_date.csv
│   │   ├── dim_match.csv
│   │   ├── dim_player.csv
│   │   ├── dim_team.csv
│   │   ├── fact_match_wyscout.csv
│   │   ├── fact_player_gps.csv
│   │   └── fact_player_wyscout.csv
│   ├── package.json
│   └── node_modules/
│
├── frontend/
│   └── saudi-league-tracker/    # Angular application
│       ├── src/
│       │   ├── app/
│       │   │   ├── components/
│       │   │   │   ├── ai-recommendation/    # AI recommendations component
│       │   │   │   ├── best-players/         # Best players component
│       │   │   │   ├── player-tracking/       # Player tracking component
│       │   │   │   ├── substitution-dialog/   # Substitution dialog
│       │   │   │   └── team-ranking/          # Team rankings component
│       │   │   ├── services/
│       │   │   │   └── data.service.ts        # API service
│       │   │   ├── app.component.ts
│       │   │   ├── app.routes.ts
│       │   │   └── app.config.ts
│       │   ├── styles.scss
│       │   └── main.ts
│       ├── package.json
│       └── angular.json
│
├── CSV/                    # Source CSV data files
│   ├── matchs_gps.csv
│   ├── training_gps.csv
│   ├── wyscout_matchs.csv
│   ├── wyscout_players_goalkeeper.csv
│   ├── wyscout_players_outfield.csv
│   └── star_schema/        # Processed star schema files
│
├── aa.py                   # Python data processing script
├── data.ipynb              # Jupyter notebook for data analysis
├── model.ipynb             # Jupyter notebook for ML models
├── start-project.bat       # Windows startup script
└── README.md               # This file
```

## 📊 Data Warehouse Schema

The project uses a **Star Schema** design with the following structure:

### Dimension Tables:
- **dim_competition**: Competition information
- **dim_date**: Date dimension with calendar attributes
- **dim_match**: Match details
- **dim_player**: Player information
- **dim_team**: Team information

### Fact Tables:
- **fact_match_wyscout**: Match-level statistics
- **fact_player_gps**: GPS tracking data for players
- **fact_player_wyscout**: Player performance metrics

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Python** 3.7+ (for data processing)
- **pandas** (Python library)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fittech
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd frontend/saudi-league-tracker
   npm install
   cd ../..
   ```

4. **Install Python Dependencies** (if needed)
   ```bash
   pip install pandas
   ```

### Running the Application

#### Option 1: Using the Startup Script (Windows)
Simply double-click `start-project.bat` or run:
```bash
start-project.bat
```

This script will:
- Check and install dependencies if needed
- Start the backend server on port 3000
- Start the frontend server on port 4200
- Open both in separate command windows

#### Option 2: Manual Start

**Start Backend Server:**
```bash
cd backend
npm start
```
Backend will run on `http://localhost:3000`

**Start Frontend Server:**
```bash
cd frontend/saudi-league-tracker
npm start
```
Frontend will run on `http://localhost:4200`

### Accessing the Application

- **Frontend:** Open your browser and navigate to `http://localhost:4200`
- **Backend API:** Available at `http://localhost:3000`

## 📡 API Endpoints

### Teams
- `GET /teams` - Get all teams

### Players
- `GET /players` - Get all players with positions and performance scores
- `GET /ai/rank-players` - Get AI-ranked players by performance

### Matches
- `GET /matches` - Get all matches
- `GET /stats` - Get match statistics

### Competitions
- `GET /competitions` - Get all competitions

### AI Features
- `POST /ai/substitute` - Process player substitution
  ```json
  {
    "playerId": "string",
    "replacementId": "string"
  }
  ```

## 🔧 Data Processing

### Running the Python Data Processing Script

The `aa.py` script processes raw CSV files and creates the star schema data warehouse:

```bash
python aa.py
```

This script:
- Loads CSV files from the `CSV/` directory
- Creates dimension tables (dim_date, dim_team, dim_player, dim_competition)
- Creates fact tables (fact_match_wyscout)
- Handles missing columns gracefully
- Outputs processed data warehouse files

### Data Processing Features

- **Safe Column Access:** Uses helper function to handle missing columns
- **Data Cleaning:** Replaces NaN values with appropriate defaults
- **Date Processing:** Extracts calendar attributes from dates
- **Data Merging:** Combines GPS and Wyscout data sources

## 🎨 UI/UX Features

- **Modern Glassmorphism Design:** Translucent cards with backdrop blur
- **Neon Color Scheme:** Cyan and pink accent colors
- **Responsive Design:** Mobile-friendly layouts
- **Smooth Animations:** Fade-in effects and hover transitions
- **Material Design Components:** Angular Material integration

## 🐛 Bug Fixes & Improvements

### Recent Fixes:
1. ✅ Fixed AI ranking sort order (now descending by performance score)
2. ✅ Added comprehensive error handling to all API endpoints
3. ✅ Fixed substitution dialog team name lookup
4. ✅ Fixed Python DataFrame column access issues
5. ✅ Added error handling to team ranking component
6. ✅ Improved data validation in backend endpoints

## 📝 Development Notes

### Backend
- Uses Express.js with async/await for better error handling
- CSV parsing with error handling
- CORS enabled for frontend communication

### Frontend
- Standalone Angular components (no NgModules)
- Reactive programming with RxJS
- Service-based architecture for API calls
- TypeScript for type safety

### Data Processing
- Pandas for efficient data manipulation
- Star schema for optimized queries
- Safe column access to handle schema variations

## 🔮 Future Enhancements

- [ ] Real-time match updates
- [ ] Advanced ML models for performance prediction
- [ ] Player comparison tools
- [ ] Export functionality for reports
- [ ] User authentication and profiles
- [ ] Historical data analysis
- [ ] Interactive charts and graphs
- [ ] Mobile app version

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

FitTech Development Team

## 🙏 Acknowledgments

- Data sources: Wyscout and GPS tracking systems
- Angular Material for UI components
- Express.js community for backend framework

---

**Note:** Make sure all CSV data files are present in the `backend/data/` directory before running the application. The backend server requires these files to serve data to the frontend.
