package ru.serovmp.hostmanager.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.serovmp.hostmanager.dto.BriefSearchResultDto;
import ru.serovmp.hostmanager.service.SearchService;

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
}
