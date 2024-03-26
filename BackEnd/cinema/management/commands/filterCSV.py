import csv
from uuid import UUID
from django.core.management.base import BaseCommand
from cinema.models import Film

class Command(BaseCommand):
    help = 'Import films from CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to the CSV file')

    def handle(self, *args, **kwargs):
        csv_file = kwargs['csv_file']
        with open(csv_file, 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            next(reader)
            for row in reader:
                if len(row) == 7:
                    try:
                        film = Film.objects.create(
                            imdbId=row[0],
                            title=row[1],
                            releaseDate=row[2],
                            trailerLink=row[3],
                            genres=row[4].strip('[]').split(','),
                            poster=row[5],
                            backdrops=row[6].strip('[]').split(','),
                        )
                        self.stdout.write(self.style.SUCCESS(f'Successfully created film "{film.title}"'))
                    except Exception as e:
                        self.stderr.write(self.style.ERROR(f'Error creating film: {str(e)}'))
                else:
                    self.stderr.write(self.style.ERROR('Invalid CSV format. Each row must have 7 columns.'))
