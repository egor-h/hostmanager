package ru.serovmp.hostmanager.restentities.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ZabbixGroupResponse {
    String groupId;
    String name;
    String internal;
}
