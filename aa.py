import os
from pathlib import Path

import pandas as pd

# ============================
# 1) Chemins et chargement des CSV
# ============================

# Dossier où se trouve ce script
BASE_DIR = Path(__file__).resolve().parent

# Dossier contenant les CSV (sous-dossier "CSV")
data_dir = BASE_DIR / "CSV"

if not data_dir.exists():
    raise FileNotFoundError(f"Le dossier {data_dir} n'existe pas. Vérifie la structure des fichiers.")

# Chargement des fichiers CSV
matches_gps = pd.read_csv(data_dir / "matchs_gps.csv")
training_gps = pd.read_csv(data_dir / "training_gps.csv")
wyscout_matches = pd.read_csv(data_dir / "wyscout_matchs.csv")
wyscout_players_goalkeeper = pd.read_csv(data_dir / "wyscout_players_goalkeeper.csv")
wyscout_players_outfield = pd.read_csv(data_dir / "wyscout_players_outfield.csv")

# Remplacement des NaN par 0 pour simplifier
for df in [matches_gps, training_gps, wyscout_matches, wyscout_players_goalkeeper, wyscout_players_outfield]:
    df.fillna(0, inplace=True)

# ============================
# 2) Dimension : dim_date
# ============================

if "date" in matches_gps.columns or "match_date" in matches_gps.columns:
    date_col = "date" if "date" in matches_gps.columns else "match_date"
    dim_date = matches_gps[[date_col]].drop_duplicates()
    dim_date = dim_date.rename(columns={date_col: "date_key"})
else:
    date_col = "date" if "date" in wyscout_matches.columns else "match_date"
    dim_date = wyscout_matches[[date_col]].drop_duplicates()
    dim_date = dim_date.rename(columns={date_col: "date_key"})

# Conversion en datetime pour extraire les champs calendaires
dim_date["date_key"] = pd.to_datetime(dim_date["date_key"])
dim_date["year"] = dim_date["date_key"].dt.year
dim_date["quarter"] = dim_date["date_key"].dt.quarter
dim_date["month_name"] = dim_date["date_key"].dt.month_name()
dim_date["week"] = dim_date["date_key"].dt.isocalendar().week
dim_date["day_of_month"] = dim_date["date_key"].dt.day
dim_date["day_of_week"] = dim_date["date_key"].dt.day_name()
dim_date["is_weekend"] = dim_date["date_key"].dt.dayofweek >= 5
dim_date["created_at"] = pd.to_datetime("now")

# On fige la clé sous forme de string
dim_date["date_key"] = dim_date["date_key"].astype(str)

# ============================
# 3) Dimension : dim_team
# ============================

if "team_name" in wyscout_matches.columns:
    dim_team = wyscout_matches[["team_name"]].drop_duplicates()
elif "team_name" in matches_gps.columns:
    dim_team = matches_gps[["team_name"]].drop_duplicates()
else:
    # Si aucune colonne team_name, on crée une dimension vide
    dim_team = pd.DataFrame({"team_name": []})

dim_team["team_key"] = dim_team.index.astype(str)
dim_team["team_name_sid"] = dim_team["team_name"].astype(str) + "_sid"
dim_team["team_name_wyscout"] = dim_team["team_name"]
dim_team["image_url_no_bg"] = "0"  # Placeholder
dim_team["image_url"] = "0"        # Placeholder
dim_team["created_at"] = pd.to_datetime("now")
dim_team["team_key"] = dim_team["team_key"].astype(str)

# ============================
# 4) Dimension : dim_player_wyscout
# ============================

dim_player_wyscout = pd.concat(
    [wyscout_players_goalkeeper, wyscout_players_outfield],
    ignore_index=True
)

# Clés techniques
dim_player_wyscout["player_key"] = dim_player_wyscout.index.astype(str)
dim_player_wyscout["match_key"] = "0"   # à remplir plus tard si besoin
dim_player_wyscout["period"] = "0"
dim_player_wyscout["segment"] = "0"
dim_player_wyscout["date_key"] = "0"

# Infos de position / compétition
dim_player_wyscout["position_type"] = dim_player_wyscout.get("position", "0")
dim_player_wyscout["competition"] = "0"

# Métriques d'attaque
dim_player_wyscout["attack_goals"] = dim_player_wyscout.get("goals", 0)
dim_player_wyscout["attack_assists"] = dim_player_wyscout.get("assists", 0)
dim_player_wyscout["attack_centres_precis"] = dim_player_wyscout.get("centres_precis", 0)
dim_player_wyscout["attack_centres_total"] = dim_player_wyscout.get("centres_total", 0)
dim_player_wyscout["attack_dribbles_reussis"] = dim_player_wyscout.get("dribbles_reussis", 0)
dim_player_wyscout["attack_dribbles_total"] = dim_player_wyscout.get("dribbles_total", 0)
dim_player_wyscout["attack_duels_offensifs_total"] = dim_player_wyscout.get("duels_offensifs_total", 0)
dim_player_wyscout["attack_duels_perdus_total"] = dim_player_wyscout.get("duels_perdus_total", 0)
dim_player_wyscout["attack_fautes_subies_total"] = dim_player_wyscout.get("fautes_subies_total", 0)
dim_player_wyscout["attack_hors_jeu"] = dim_player_wyscout.get("hors_jeu", 0)
dim_player_wyscout["attack_passes_decisives_tirs"] = dim_player_wyscout.get("passes_decisives_tirs", 0)
dim_player_wyscout["attack_passes_total"] = dim_player_wyscout.get("passes_total", 0)
dim_player_wyscout["attack_touches_surface_reparation"] = dim_player_wyscout.get("touches_surface_reparation", 0)

# Métriques de défense
dim_player_wyscout["defense_cartons_jaunes"] = dim_player_wyscout.get("cartons_jaunes", 0)
dim_player_wyscout["defense_cartons_rouges"] = dim_player_wyscout.get("cartons_rouges", 0)
dim_player_wyscout["defense_degagements_total"] = dim_player_wyscout.get("degagements_total", 0)
dim_player_wyscout["defense_duels_defensifs_gagnes"] = dim_player_wyscout.get("duels_defensifs_gagnes", 0)
dim_player_wyscout["defense_duels_defensifs_total"] = dim_player_wyscout.get("duels_defensifs_total", 0)
dim_player_wyscout["defense_duels_perdus_total"] = dim_player_wyscout.get("duels_perdus_total", 0)
dim_player_wyscout["defense_fautes_total"] = dim_player_wyscout.get("fautes_total", 0)
dim_player_wyscout["defense_interceptions_total"] = dim_player_wyscout.get("interceptions_total", 0)

# Métriques générales
dim_player_wyscout["general_cartons_jaunes"] = dim_player_wyscout.get("cartons_jaunes", 0)
dim_player_wyscout["general_cartons_rouges"] = dim_player_wyscout.get("cartons_rouges", 0)
dim_player_wyscout["general_centres_precis"] = dim_player_wyscout.get("centres_precis", 0)
dim_player_wyscout["general_centres_total"] = dim_player_wyscout.get("centres_total", 0)
dim_player_wyscout["general_dribbles_reussis"] = dim_player_wyscout.get("dribbles_reussis", 0)
dim_player_wyscout["general_dribbles_total"] = dim_player_wyscout.get("dribbles_total", 0)
dim_player_wyscout["general_duels_aeriens_gagnes"] = dim_player_wyscout.get("duels_aeriens_gagnes", 0)
dim_player_wyscout["general_duels_aeriens_total"] = dim_player_wyscout.get("duels_aeriens_total", 0)
dim_player_wyscout["general_duels_perdus_total"] = dim_player_wyscout.get("duels_perdus_total", 0)
dim_player_wyscout["general_interceptions_total"] = dim_player_wyscout.get("interceptions_total", 0)
dim_player_wyscout["general_passes_decisives"] = dim_player_wyscout.get("passes_decisives", 0)
dim_player_wyscout["general_passes_longues_precises"] = dim_player_wyscout.get("passes_longues_precises", 0)
dim_player_wyscout["general_passes_longues_total"] = dim_player_wyscout.get("passes_longues_total", 0)

# Types des clés
dim_player_wyscout["match_key"] = dim_player_wyscout["match_key"].astype(str)
dim_player_wyscout["date_key"] = dim_player_wyscout["date_key"].astype(str)
dim_player_wyscout["player_key"] = dim_player_wyscout["player_key"].astype(str)

# ============================
# 5) Dimension : dim_competition
# ============================

if "competition" in wyscout_matches.columns:
    dim_competition = wyscout_matches[["competition"]].drop_duplicates()
else:
    dim_competition = pd.DataFrame(columns=["competition"])

dim_competition["competition_key"] = dim_competition.index.astype(str)
dim_competition["competition_name_std"] = dim_competition.get("competition", "0")
dim_competition["competition_name_wyscout"] = dim_competition.get("competition", "0")
dim_competition["competition_name_sportdb"] = dim_competition.get("competition", "0")
dim_competition["created_at"] = pd.to_datetime("now")
dim_competition["competition_key"] = dim_competition["competition_key"].astype(str)

# ============================
# 6) Table de faits : fact_match_wyscout
# ============================

# On remet les index à zéro
matches_gps = matches_gps.reset_index(drop=True)
wyscout_matches = wyscout_matches.reset_index(drop=True)

# Clé synthétique commune : match_id
matches_gps["match_id"] = range(len(matches_gps))
wyscout_matches["match_id"] = range(len(wyscout_matches))

# Jointure outer sur match_id (clé artificielle)
fact_match_wyscout = pd.merge(
    matches_gps,
    wyscout_matches,
    on="match_id",
    how="outer"
)

# Clé technique de la table de faits
fact_match_wyscout["team_match_wyscout_key"] = fact_match_wyscout.index.astype(str)
fact_match_wyscout["match_key"] = fact_match_wyscout["match_id"].astype(str)

# Liaisons vers les dimensions (pour l'instant avec des valeurs par défaut simples)
fact_match_wyscout["score"] = fact_match_wyscout.get("score", "0-0")
fact_match_wyscout["competition_key"] = (
    dim_competition["competition_key"].iloc[0] if not dim_competition.empty else "0"
)
fact_match_wyscout["player_key"] = "0"
fact_match_wyscout["team_key"] = (
    dim_team["team_key"].iloc[0] if not dim_team.empty else "0"
)
fact_match_wyscout["date_key"] = (
    dim_date["date_key"].iloc[0] if not dim_date.empty else "0"
)

for col in [
    "match_key",
    "team_match_wyscout_key",
    "competition_key",
    "player_key",
    "team_key",
    "date_key",
]:
    fact_match_wyscout[col] = fact_match_wyscout[col].astype(str)

# ============================
# 7) Construction du data warehouse final
# ============================

data_warehouse = pd.merge(fact_match_wyscout, dim_team, on="team_key", how="left")
data_warehouse = pd.merge(data_warehouse, dim_player_wyscout, on="player_key", how="left")
data_warehouse = pd.merge(data_warehouse, dim_date, on="date_key", how="left")
data_warehouse = pd.merge(data_warehouse, dim_competition, on="competition_key", how="left")

# ============================
# 8) Sauvegarde
# ============================

output_path = data_dir / "data_warehouse.csv"
data_warehouse.to_csv(output_path, index=False)

print(f"✅ Data warehouse sauvegardé dans : {output_path}")
print(data_warehouse.head())
