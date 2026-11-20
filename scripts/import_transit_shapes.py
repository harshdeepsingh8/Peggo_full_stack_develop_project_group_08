import argparse
import csv
import json
from collections import defaultdict
from io import TextIOWrapper
from pathlib import Path
from zipfile import ZipFile


def read_rows(feed, filename):
    with feed.open(filename) as raw:
        with TextIOWrapper(raw, encoding="utf-8-sig", newline="") as file:
            yield from csv.DictReader(file)


def build_route_paths(feed):
    route_codes = {
        row["route_id"]: row["route_short_name"].strip().upper()
        for row in read_rows(feed, "routes.txt")
    }

    points_by_shape = defaultdict(list)
    for row in read_rows(feed, "shapes.txt"):
        points_by_shape[row["shape_id"]].append((
            int(row["shape_pt_sequence"]),
            round(float(row["shape_pt_lat"]), 6),
            round(float(row["shape_pt_lon"]), 6),
        ))

    lines_by_shape = {
        shape_id: tuple((lat, lon) for _, lat, lon in sorted(points))
        for shape_id, points in points_by_shape.items()
        if len(points) >= 2
    }

    shape_ids_by_route = defaultdict(set)
    for trip in read_rows(feed, "trips.txt"):
        code = route_codes.get(trip["route_id"])
        shape_id = trip.get("shape_id")
        if code and shape_id in lines_by_shape:
            shape_ids_by_route[code].add(shape_id)

    return {
        code: sorted({lines_by_shape[shape_id] for shape_id in shape_ids})
        for code, shape_ids in sorted(shape_ids_by_route.items())
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("gtfs_zip", type=Path)
    args = parser.parse_args()

    with ZipFile(args.gtfs_zip) as feed:
        routes = build_route_paths(feed)

    if not routes:
        raise SystemExit("No route shapes found. Check that you downloaded the GTFS Schedule ZIP.")

    output = Path(__file__).resolve().parents[1] / "src" / "data" / "winnipegRoutePaths.json"
    output.write_text(json.dumps(routes, separators=(",", ":")) + "\n", encoding="utf-8")
    print(f"Exported paths for {len(routes)} routes to {output}")


if __name__ == "__main__":
    main()