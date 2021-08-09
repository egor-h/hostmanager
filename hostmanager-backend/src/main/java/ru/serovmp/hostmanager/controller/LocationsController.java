package ru.serovmp.hostmanager.controller;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.serovmp.hostmanager.controller.form.LocationForm;
import ru.serovmp.hostmanager.entity.Location;
import ru.serovmp.hostmanager.repository.LocationRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/locations")
public class LocationsController {
    private static final int DEFAULT_PAGE_SIZE = 32;

    private LocationRepository locationRepository;

    public LocationsController(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @GetMapping
    public List<Location> all() {
        return locationRepository.findAll();
    }

    @GetMapping("/{id}")
    public Location one(@PathVariable long id) {
        return locationRepository.findById(id).orElseThrow(() -> new RuntimeException("location " + id + " not found"));
    }

    @GetMapping("/page/{page}")
    public List<Location> byPage(@PathVariable int page, @RequestParam(value = "pageSize", required = false) Optional<Integer> pageSize) {
        return locationRepository.findAll(PageRequest.of(page, pageSize.orElse(DEFAULT_PAGE_SIZE))).getContent();
    }

    @PostMapping
    public Location create(@RequestBody LocationForm locationForm) {
        return locationRepository.save(new Location(0, locationForm.getName(), locationForm.getDescription()));
    }

    @PutMapping("/{id}")
    public Location update(@PathVariable long id, @RequestBody LocationForm locationForm) {
        Location oldLocation = locationRepository.findById(id).orElseThrow(() -> new RuntimeException("location " + id + " not found"));
        oldLocation.setName(locationForm.getName());
        oldLocation.setDescription(locationForm.getDescription());
        return locationRepository.save(oldLocation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable long id) {
        locationRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
