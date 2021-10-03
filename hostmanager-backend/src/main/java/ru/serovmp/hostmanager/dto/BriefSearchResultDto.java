package ru.serovmp.hostmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BriefSearchResultDto {
    private List<BriefHost> hosts;
    private List<BriefNoteDto> notes;
    private List<ProtocolDto> protocols;
    private List<TagDto> tags;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BriefHost {
        private long id;
        private String name;
        private boolean dir;
        private String address;
    }
}
