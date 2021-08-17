package ru.serovmp.hostmanager.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.serovmp.hostmanager.entity.Location;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LocationDto {
    private long id;
    private String name;
    private String description;
}
