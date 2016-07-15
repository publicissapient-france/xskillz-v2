'use strict';

const DomainRepository = require('./domain-repository');
const SkillRepository = require('../skill/skill-repository');

module.exports = {
    init: (args) => {
        this.DomainRepository = DomainRepository;
        this.DomainRepository.init(args);
        
        this.SkillRepository = SkillRepository;
        this.SkillRepository.init(args);
    },
    
    getDomains: (req, res) => {
        this.DomainRepository
            .getDomains()
            .then((domains) => {
                res.send(domains);
            });
    },
    addDomain: (req, res) =>
        this.DomainRepository
            .addDomain(req.body.name, req.body.color)
            .then(() => this.DomainRepository.findDomainByName(req.body.name))
            .then((domain) => res.send(domain)),

    deleteDomain: (req, res) =>
        this.SkillRepository
            .removeDomainFromSkills(req.params.id)
            .then(() => this.DomainRepository.deleteDomain(req.params.id))
            .then(() => res.jsonp({deleted: true}))
};