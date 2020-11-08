package ru.serovmp.hostmanager.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.serovmp.hostmanager.entity.Host;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HostDto {
    private long id;
    private String name;
    private String address;
    @JsonProperty("dir")
    private boolean isDir;
    @JsonProperty("chld")
    private Set<HostDto> children;
}
