package ru.serovmp.hostmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.serovmp.hostmanager.dto.BriefNoteDto;
import ru.serovmp.hostmanager.dto.BriefSearchResultDto;
import ru.serovmp.hostmanager.dto.ProtocolDto;
import ru.serovmp.hostmanager.dto.TagDto;
import ru.serovmp.hostmanager.repository.HostRepository;
import ru.serovmp.hostmanager.repository.NoteRepository;
import ru.serovmp.hostmanager.repository.ProtocolRepository;
import ru.serovmp.hostmanager.repository.TagRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchService {
    private static final long SEARCH_LIMIT = 5;

    private HostRepository hostRepository;
    private NoteRepository noteRepository;
    private ProtocolRepository protocolRepository;
    private TagRepository tagRepository;

    @Autowired
    public SearchService(HostRepository hostRepository, NoteRepository noteRepository, ProtocolRepository protocolRepository, TagRepository tagRepository) {
        this.hostRepository = hostRepository;
        this.noteRepository = noteRepository;
        this.protocolRepository = protocolRepository;
        this.tagRepository = tagRepository;
    }

    public BriefSearchResultDto briefSearch(String query) {
        List<BriefSearchResultDto.BriefHost> hosts = hostRepository.topRecents(query, SEARCH_LIMIT).stream()
                .map(h -> new BriefSearchResultDto.BriefHost(h.getId(), h.getName(), h.getAddress()))
                .collect(Collectors.toList());
        List<BriefNoteDto> notes = noteRepository.topRecents(query, SEARCH_LIMIT).stream()
                .map(note -> new BriefNoteDto(note.getId(), note.getTitle(), note.getCreatedAt(), note.isDone()))
                .collect(Collectors.toList());
        List<ProtocolDto> protocols = protocolRepository.topRecents(query, SEARCH_LIMIT).stream()
                .map(proto -> new ProtocolDto(proto.getId(), proto.getName(), proto.getExecutionLine(), proto.getLaunchType().name(), proto.getValidationRegex(), proto.getExpectedExitCode()))
                .collect(Collectors.toList());
        List<TagDto> tags = tagRepository.topRecents(query, SEARCH_LIMIT).stream()
                .map(tag -> new TagDto(tag.getId(), tag.getName()))
                .collect(Collectors.toList());

        return BriefSearchResultDto.builder()
                .hosts(hosts)
                .notes(notes)
                .protocols(protocols)
                .tags(tags)
                .build();
    }
}
