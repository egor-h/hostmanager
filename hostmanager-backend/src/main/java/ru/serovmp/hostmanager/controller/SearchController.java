package ru.serovmp.hostmanager.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.serovmp.hostmanager.dto.BriefSearchResultDto;
import ru.serovmp.hostmanager.service.search.SearchService;

import java.util.Map;

@SecurityRequirement(name = "bearer-key")
@RequestMapping("/api/v1/search")
@RestController
public class SearchController {
    private SearchService searchService;

    @Autowired
    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/brief/{query}")
    public BriefSearchResultDto briefSearch(@PathVariable("query") String query) {
        return searchService.briefSearch(query);
    }

    @GetMapping("/in/{category}/detail/{query}")
    public void detailedSearchInCategory(@PathVariable("category") String category, @PathVariable("query") String query) {
        
    }

    @GetMapping("/hosts/{query}")
    public ResponseEntity fullSearchHost(@PathVariable("query") String query, @RequestParam("page") int page) {
        return ResponseEntity.ok(Map.of(
                "page", page,
                "hosts", searchService.searchHosts(query, page)));
    }

    @GetMapping("/indexAllData")
    public ResponseEntity indexAllData() {
        searchService.indexAlldata();
        return ResponseEntity.ok().build();
    }
}
