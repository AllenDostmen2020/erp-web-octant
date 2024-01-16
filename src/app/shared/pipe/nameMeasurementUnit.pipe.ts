import { Pipe, PipeTransform, inject } from '@angular/core';
import { MeasurementUnit } from '@interface/measurementUnit';
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';

@Pipe({
  name: 'nameMeasurementUnit',
  standalone: true,
})
export class NameMeasurementUnitPipe implements PipeTransform {
    private databaseStorage = inject(DatabaseStorageService);

    async transform(id: number | null | undefined): Promise<string | null | undefined> {
      if (!id) return null;
      const measurementUnit = await this.databaseStorage.getOne<MeasurementUnit>(NameModuleDatabase.MEASUREMENT_UNITS, id);
      return measurementUnit?.abbreviation ?? null;      
    }

}
