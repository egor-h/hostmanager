package ru.serovmp.hostmanager.controller.form;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoteForm {
    private String title;
    private String text;
    private boolean done;
    private List<Long> hosts;
}
