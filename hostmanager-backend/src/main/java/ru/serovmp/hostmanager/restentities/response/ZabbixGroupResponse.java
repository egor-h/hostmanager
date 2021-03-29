package ru.serovmp.hostmanager.restentities.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@NoArgsConstructor
public class ZabbixGroupResponse {
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public class Result {
        String groupId;
        String name;
        String internal;
    }

    @Getter
    private List<Result> result;

    @JsonProperty("result")
    void setResult(List<Map<String, String>> results) {
        result = results.stream()
                .map(grpMap -> new Result(grpMap.get("groupid"), grpMap.get("name"), grpMap.get("internal")))
                .collect(Collectors.toList());
    }

}
